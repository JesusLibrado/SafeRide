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
  },
  currentTrip: {
    type: Schema.Types.ObjectId,
    ref: 'Trip'
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

newSchema.virtual('fullName').get(function(){return `${this.name} ${this.surname}`;});

const Student = mongoose.model('Student', newSchema);
module.exports = Student;