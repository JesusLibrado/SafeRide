const mongoose = require('mongoose');

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
    required: [true, 'Email is required']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required']
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Student = mongoose.model('Student', newSchema);
module.exports = Student;