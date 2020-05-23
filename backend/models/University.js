const mongoose = require('mongoose');

const newSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'University official name is required']
    },
    shortName: {
        type: String
    },
    domainNames: {
        type: [String],
        required: [function() {
            return this.length < 1;
        }, 'At least one domain name is required']
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'GeoPoint'
    }
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const University = mongoose.model('University', newSchema);
module.exports = University;