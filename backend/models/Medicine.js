const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number,
    manufacturer: String,
    expiryDate: Date
});

module.exports = mongoose.model('Medicine', medicineSchema);
