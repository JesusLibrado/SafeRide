const StudentModel = require('../models/Student');

exports.findStudentById = async (id, fields = '') =>{
    try {
        return await StudentModel.findById(id, fields);
    }catch(err) {
        return err;
    }
}

exports.findStudentByEmail = async (email, fields = '') =>{
    try {
        return await StudentModel.findOne({email: email}, fields);
    }catch(err) {
        return err;
    }
}

exports.findStudentByPhoneNumber = async (phoneNumber, fields = '') =>{
    try {
        return await StudentModel.findOne({phoneNumber: phoneNumber}, fields);
    }catch(err) {
        return err;
    }
}

exports.findStudent = async (criteria, fields = '') =>{
    try {
        return await StudentModel.findOne({email: criteria}, fields) || await StudentModel.findOne({phoneNumber: criteria}, fields);
    }catch(err) {
        return new Error(err);
    }
}