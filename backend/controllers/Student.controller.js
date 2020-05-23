const Student = require('../models/Student');
const universityHooks = require('../hooks/university.hook');

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
        let uni = await universityHooks.findUniversity(req.body.university, 'id');
        console.log("uni", uni);
        let newStudent = new Student(req.body);
        console.log("student", newStudent);
        try{
            let student = await newStudent.save();
            res.json(student);
        }catch(err){
            res.json({error: err, msg: "Student registration is not available"});
        }
    }
}