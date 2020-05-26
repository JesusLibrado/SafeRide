const mongoose = require('mongoose');
const Location = require('./Location');

const newSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: [true, 'Stop priority number required'],
        min: 1
    },
    location: {
        type: Location.schema
    }
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Stop = mongoose.model('Stop', newSchema);
module.exports = Stop;