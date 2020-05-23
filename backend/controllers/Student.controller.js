const Student = require('../models/Student');

module.exports = {
    getAll: async (req, res, next) => {
        try{
            let students = await Student.find();
            res.json(students);
        }catch(err){
            res.json({error: err, msg: "Couldn't retrieve students list"});
        }
    },
    create: async (req, res, next) => {
        let newStudent = new Student(req.body);
        try{
            let student = await newStudent.save();
            res.json(student);
        }catch(err){
            res.json({error: err, msg: "Student registration is not available"});
        }
    }
}