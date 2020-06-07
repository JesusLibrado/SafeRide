const Driver = require('../models/Driver');
const University = require('../models/University');

exports.getDriverById = async (id, fields='') =>{
    return await Driver.findById(id, fields);
}

exports.getDriverUniversity = async (id, uni_fields='') =>{
    let driver = await Driver.findOne({"_id": id})
    .populate('student')
    .populate('university');
    if(driver) {
        let university =  await University.findById( driver.student.university);
        console.log(university);

        return university;
    }
    else {
        return null;
    }
}