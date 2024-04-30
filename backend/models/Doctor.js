const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: String,
    specialization: String,
    contact: String,
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' } // Assuming a doctor belongs to a hospital
});

module.exports = mongoose.model('Doctor', doctorSchema);
