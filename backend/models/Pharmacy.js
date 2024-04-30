const mongoose = require('mongoose');

const pharmacySchema = new mongoose.Schema({
    name: String,
    location: String,
    contact: String
});

module.exports = mongoose.model('Pharmacy', pharmacySchema);
