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

newSchema.index({ trip: 1, student: 1}, { unique: true });

const JoinRequest = mongoose.model('JoinRequest', newSchema);
JoinRequest.ensureIndexes(function (err) {
    console.log('Ensure JoinRequest Index');
    if (err) console.log(err);
});
// JoinRequest.on('index', function (err) {
//     console.log('On index for JoinRequest');
//     if (err) console.log(err);
// });

module.exports = JoinRequest;