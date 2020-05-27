const mongoose = require('mongoose');

const newSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: [true, "Type 'point' is required"]
      },
      coordinates: {
        type: [Number],
        required: [true, "Coordinates: [] are missing"]
      }
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const GeoPoint = mongoose.model('GeoPoint', newSchema);
module.exports = GeoPoint;