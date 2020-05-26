const mongoose = require('mongoose');
const Stop = require('./Stop');
const Schema = mongoose.Schema;

const newSchema = new mongoose.Schema({
    driver: {
        type: Schema.Types.ObjectId,
        ref: 'Driver',
        require: true
    },
    passengers: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }],
    availableSeats: {
        type: Number,
        required: [true, 'Available seats number is missing']
    },
    stops: [{
        type: Stop.schema
    }]
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

const Trip = mongoose.model('Trip', newSchema);
module.exports = Trip;