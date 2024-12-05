const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        rate: {
            type: Number,
        },
        count: {
            type: Number
        }
    },
    image: {
        type: String,
        required: true
    },
    sizes: [
        {
            size: {
                type: String,
                required: true
            },
            available_quantity: {
                type: Number,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('Product', ProductSchema);
