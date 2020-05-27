const mongoose = require('mongoose');
const Point = require('./Point');

const newSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Location name is missing'],
        unique: true
    },
    address: {
        type: String,
        //required: [true, 'Address is missing']
    },
    city: {
        type: String,
        //required: [true, 'City is missing']
    },
    postalCode: {
        type: Number,
        //required: [true, 'Postal code is missing']
    },
    location: {
        type: Point.schema,
        required: [true, "Point is required"]
    }
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Location = mongoose.model('Location', newSchema);
module.exports = Location;