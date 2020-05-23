const mongoose = require('mongoose');

const newSchema = new mongoose.Schema({
    address: {
        type: String,
        required: [true, 'Address is missing']
    },
    city: {
        type: String,
        required: [true, 'City is missing']
    },
    postalCode: {
        type: Number,
        required: [true, 'Postal code is missing']
    },
    location: {
        type: GeoPoint,
        required: [true, "GeoPoint is required"]
    }
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Location = mongoose.model('Location', newSchema);
module.exports = Location;