// medicineRoutes.js

const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');
const { checkExpiryDate } = require('../utils'); // Import the checkExpiryDate function

// Route for adding a new medicine
router.post('/medicines', async (req, res) => {
    try {
        const { name, price, manufacturer, expiryDate } = req.body;
        // Check if the expiry date has passed
        if (checkExpiryDate(expiryDate)) {
            return res.status(400).json({ message: 'Expiry date has passed' });
        }
        const newMedicine = new Medicine({ name, price, manufacturer, expiryDate });
        await newMedicine.save();
        res.status(201).json(newMedicine);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route for deleting a medicine by ID
router.delete('/medicines/:id', async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id);
        if (!medicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }
        await medicine.remove();
        res.json({ message: 'Medicine deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route for updating a medicine by ID
router.put('/medicines/:id', async (req, res) => {
    try {
        const { name, price, manufacturer, expiryDate } = req.body;
        // Check if the expiry date has passed
        if (checkExpiryDate(expiryDate)) {
            return res.status(400).json({ message: 'Expiry date has passed' });
        }
        const updatedMedicine = await Medicine.findByIdAndUpdate(req.params.id, 
            { name, price, manufacturer, expiryDate },
            { new: true }
        );
        if (!updatedMedicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }
        res.json(updatedMedicine);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route for getting all medicines
router.get('/medicines', async (req, res) => {
    try {
        const medicines = await Medicine.find();
        res.json(medicines);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route for getting a medicine by ID
router.get('/medicines/:id', async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id);
        if (!medicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }
        res.json(medicine);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
