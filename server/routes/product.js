const express = require('express');
const router = express.Router();
const { Product } = require("../models/Product");
const multer = require('multer');

const { auth } = require("../middleware/auth");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")


//=================================
//             Product
//=================================

router.post("/uploadImage", auth, (req, res) => {

    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })

});


router.post("/uploadProduct", auth, (req, res) => {

    //save all the data we got from the client into the DB 
    const product = new Product(req.body)

    product.save((err, product) => {
        if (err) return res.status(400).json({ success: false, err })
        Product.find({ '_id': product._id })
            .populate('writer')
            .exec((err, result) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({ success: true, result })
            })
    })

});


router.post("/getProducts", auth, (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = "_id";

    let findArgs = req.body.filters
    let term = req.body.searchTerms;

    if(term) {
        Product.find(findArgs)
        .find({ $text: { $search: term } })
        .populate("writer")
        .sort([[sortBy, order]])
        .exec((err, products) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, products, postSize: products.length })
        })
    } else {
        Product.find(findArgs)
        .populate("writer")
        .sort([[sortBy, order]])
        .exec((err, products) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, products, postSize: products.length })
        })
    }
});



router.get("/products_by_id", (req, res) => {
    let type = req.query.type
    let productIds = req.query.id
    
    Product.find({ '_id': { $in: productIds } })
        .populate('writer')
        .exec((err, product) => {
            if (err) return res.status(400).send(err)
            return res.status(200).send(product)
        })
});


router.post("/update", (req, res) => {
    let productIds = req.query.id
    Product.findById(productIds)
        .populate("writer")
        .then((product) => {
            if (!product) res.status(404).send("Product is not found");
            else {
                product.response = req.body.response;
                product.responseImages = req.body.responseImages;
                product.status = req.body.status
                product.save()
                    .then(() => res.json('product updated!'))
                    .catch(err => res.status(400).json('Error: ' + err));
            }
        }).catch(err => res.status(400).json('Error: ' + err));
})

router.post("/view", (req, res) => {
    let productIds = req.query.id
    Product.findById(productIds)
        .populate("writer")
        .then((product) => {
            if (!product) res.status(404).send("Product is not found");
            else {
                product.userResponse = req.body.userResponse
                product.save()
                    .then(() => res.json('product updated!'))
                    .catch(err => res.status(400).json('Error: ' + err));
            }
        }).catch(err => res.status(400).json('Error: ' + err));
})



module.exports = router;
