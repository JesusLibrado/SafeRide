const mongoose = require('mongoose');
const Location = require('./Location');

const newSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'University official name is required'],
        unique: true
    },
    shortName: {
        type: String,
        unique: true
    },
    domainNames: {
        type: [String],
        required: [function() {
            return this.length < 1;
        }, 'At least one domain name is required']
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

const University = mongoose.model('University', newSchema);
module.exports = University;