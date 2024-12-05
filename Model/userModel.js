const mongoose = require('mongoose');

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    is_admin: {
        type: Boolean,
        default: false
    },
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Order'
        },
    ],
    card: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Card'
        }
    ]
})

module.exports = mongoose.model('users', UserSchema);