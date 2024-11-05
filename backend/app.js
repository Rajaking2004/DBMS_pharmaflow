const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const medicineRoutes = require('./routes/entityRoutes'); // Import the medicine routes

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Use the medicine routes
app.use('/api/manage', medicineRoutes);

// MongoDB connection add more connection
mongoose.connect('mongodb://localhost:27017/medicine_inventory', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch(err => console.log(err));
