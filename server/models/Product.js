const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String
    },
    images: {
        type: Array,
        default: []
    },
    response: {
        type: String
    },
    responseImages: {
        type: Array,
        default: []
    },
    status: {
        type: Number,
        default: 1
    },
    userResponse: {
        type: Array,
        default: []
    }
}, { timestamps: true })

productSchema.index({
    title:'text',
    description: 'text',
    response: 'text',
    userResponse: 'text'
}, {
    weights: {
        title:2,
        description:1,
        response:1,
        userResponse:1
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }