# İpsizCambaz Sample Project

## See Live Version
See Live:
[https://ipsizcambaz.herokuapp.com/login](https://ipsizcambaz.herokuapp.com/login)

## Project setup
1. create dev.js file inside of "./server/config" folder
2. place in mongoDB information into dev.js file 
3. create "./uploads" folder in main directory
4. Type  " npm install " inside the "./server" directory  to download Server dependencies
5. Type " npm install " inside the "./client" directory to download Client dependencies


### Compiles and hot-reloads for development
```
npm run dev
```

### Scripts
```json
"scripts": {
    "start": "node server/index.js",
    "backend": "nodemon server/index.js",
    "build": "cd client && npm run build",
    "heroku-postbuild": "npm run install-client && npm run build",
    "frontend": "npm run start --prefix client",
    "dev": "concurrently \"npm run backend\" \"npm run start --prefix client\""
  }
```
### For Testing Admin & User Version
For Admin connection sign-in with;
- email: test11@gmail.com
- password: test11
For Existing User connection sign-in with;
- email: test22@gmail.com
- password: test22 
### For Questions
Linkedin Account:
[https://www.linkedin.com/in/barış-yıldırım-933375194](https://www.linkedin.com/in/barış-yıldırım-933375194)
Gmail Account:
yildrmbaris@gmail.com

### Code Explanation
##### User Schema
- Each user have following features.
- Every new user assigned as `Normal User`. With the change of `Role` at database user can assigned as `Admin`
- Emails should be `Unique`
- Tokens are assigned secure user informations
```javascript
const userSchema = mongoose.Schema({
    name: {type:String, maxlength:50},
    email: {type:String, trim:true, unique: 1 },
    password: {type: String, minglength: 5},
    lastname: {type:String, maxlength: 50},
    role : {type:Number, default: 0 },
    token : {type: String,},
    tokenExp :{type: Number}
})
```
##### Hash Password with Bcrypt
- When password is modified, before saving password to User Schema, password is hashed with Bcrypt.
```javascript
userSchema.pre('save', function( next ) {
    var user = this;
    
    if(user.isModified('password')){    
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);
    
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash 
                next()
            })
        })
    } else {
        next()
    }
});
```
##### Product(Ticket) Schema
- Each product have following features
- Writers informations are referenced from userSchema
```javascript
const productSchema = mongoose.Schema({
    writer: {type: Schema.Types.ObjectId, ref: 'User', index: true},
    title: {type: String, maxlength: 50},
    description: {type: String},
    images: {type: Array, default: []},
    response: {type: String},
    responseImages: {type: Array, default: []},
    status: {type: Number, default: 1},
    userResponse: {type: Array, default: []}
}, { timestamps: true })
```
##### Get Product API
- With `Body Parser` filters are received. During fetching data from database these filters are used.
- Search feature is handled with same method.
```javascript
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
```

##### Get Single Product API
- During fetching a single product `Query` of Product Id is selected from URL.
```javascript
router.get("/products_by_id", (req, res) => {
    let productIds = req.query.id
    
    Product.find({ '_id': { $in: productIds } })
        .populate('writer')
        .exec((err, product) => {
            if (err) return res.status(400).send(err)
            return res.status(200).send(product)
        })
});
```
##### Admin Update Product API
- During fetching a single product `Query` of Product Id is selected from URL.
- Admin can change status and give response and response Images to Users.
```javascript
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
```

##### User View Product API
- During fetching a single product `Query` of Product Id is selected from URL.
- User can add new messages. Except from new messages User has no rights on changing Product.
```javascript
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
```





