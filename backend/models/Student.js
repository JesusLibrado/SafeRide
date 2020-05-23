const mongoose = require('mongoose');

const newSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  phoneNumber: {
    type: String
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Student = mongoose.model('Student', newSchema);
module.exports = Student;


// 'use strict';
// module.exports = mongoose => {
//   const newSchema = new mongoose.Schema({
//     name: {
//       type: String
//     },
//     email: {
//       type: String
//     },
//     phoneNumber: {
//       type: String
//     }
//   }, {
//     timestamps: {
//       createdAt: 'created_at',
//       updatedAt: 'updated_at'
//     }
//   });
//   const Student = mongoose.model('Student', newSchema);
//   return Student;
// };