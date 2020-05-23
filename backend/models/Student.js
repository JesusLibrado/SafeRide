const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  surname: {
    type: String
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true
  },
  university: {
    type: Schema.Types.ObjectId,
    ref: 'University',
    required: [true, 'Indicate students university']
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Student = mongoose.model('Student', newSchema);
module.exports = Student;