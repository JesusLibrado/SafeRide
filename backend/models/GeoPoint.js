const mongoose = require('mongoose');

const newSchema = new mongoose.Schema({
    latitude: {
        type: Number,
        required: [true, 'Latittude is required']
    },
    longitude: {
        type: Number,
        required: [true, 'Longitude is required']
    }
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const GeoPoint = mongoose.model('GeoPoint', newSchema);
module.exports = GeoPoint;