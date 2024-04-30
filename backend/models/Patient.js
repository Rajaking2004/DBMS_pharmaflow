const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    address: String,
    contact: String
});

module.exports = mongoose.model('Patient', patientSchema);
