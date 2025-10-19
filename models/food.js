// models/Food.js
const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String
});

module.exports = mongoose.model('Food', foodSchema);
