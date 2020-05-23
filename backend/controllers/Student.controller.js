const Student = require('../models/Student');

module.exports = {
    getAll: async (req, res, next) => {
        let students = await Student.find();
        res.json(students);
    }
}