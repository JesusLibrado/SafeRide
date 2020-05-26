const Driver = require('../models/Driver');

exports.getDriverById = async (id, fields='') =>{
    return await Driver.findById(id, fields);
}

exports.getDriverUniversity = async (id, uni_fields='') =>{
    let driver = await Driver.findById(id)
    .populate({
        path: 'student', 
        populate: {
            path: 'university', 
            select: uni_fields
        }
    });
    return driver.student.university;
}