// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: String,
    mobile: String,
    city: String,
    zipcode: String,
    address: String,
    delivery: String,
    payment: String,
    cart: Array,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
