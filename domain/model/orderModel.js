const mongoose = require('mongoose');
const Customer = require('./customerModel');

const orderItemSchema = new mongoose.Schema({
    item_id: {
        type: String,
        required: true
    },
    item_name: {
        type: String,
        required: true
    },
    item_quantity: {
        type: Number,
        required: true
    },
    item_price: {
        type: Number,
        required: true
    },
    item_description: {
        type: String,
        required: true
    }
});

const orderSchema = new mongoose.Schema({
    order_id: {
        type: String,
        required: true,
        unique: true
    },
    order_name: {
        type: String,
        required: true
    },
    total_price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    order_items: [orderItemSchema],
    customer: {
        type: Customer.schema,
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.String,
        ref: 'User',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
