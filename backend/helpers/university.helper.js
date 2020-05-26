const UniversityModel = require('../models/University');

exports.findUniversityById = async (id, fields = '') =>{
    return await UniversityModel.findById(id, fields);
}

exports.findUniversity = async (uniName, fields = '') =>{
    return await UniversityModel.findOne({name: uniName}, fields) || await UniversityModel.findOne({shortName: uniName}, fields);
}