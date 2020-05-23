const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newSchema = new mongoose.Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    },
    plates: {
        type: String,
        required: [true, 'Plate number is required'],
        unique: true
    },
    carModel: {
        type: String,
        //required: [true, 'Car model is required']
    }
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Driver = mongoose.model('Driver', newSchema);
module.exports = Driver;