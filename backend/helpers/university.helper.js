const UniversityModel = require('../models/University');

exports.findUniversityById = async (id, fields = '') =>{
    try {
        return await UniversityModel.findById(id, fields);
    }catch(err) {
        return err;
    }
}

exports.findUniversity = async (uniName, fields = '') =>{
    try {
        return await UniversityModel.findOne({name: uniName}, fields) || await UniversityModel.findOne({shortName: uniName}, fields);
    }catch(err) {
        return err;
    }
}