const UniversityModel = require('../models/University');

exports.findUniversityById = async (id, fields = '') =>{
    console.log(id);
    try {
        return await UniversityModel.findById(id, fields);
    }catch(err) {
        return err;
    }
}

exports.findUniversity = async (uniName, fields = '') =>{
    console.log(uniName);
    try {
        return await UniversityModel.findOne({name: uniName}, fields) || await UniversityModel.findOne({shortName: uniName}, fields);
    }catch(err) {
        return err;
    }
}