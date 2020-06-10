const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newSchema = new mongoose.Schema({
    status: {
      type: Schema.Types.String,
      require: true  
    },
    driver: {
        type: Schema.Types.ObjectId,
        ref: 'Driver',
        require: true
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        require: true
    },
    trip: {
        type: Schema.Types.ObjectId,
        ref: 'Trip',
        require: true,
    }
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

const JoinRequest = mongoose.model('JoinRequest', newSchema);
module.exports = JoinRequest;