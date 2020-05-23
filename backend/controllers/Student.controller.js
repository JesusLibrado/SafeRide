const Student = require('../models/Student');
const universityHelpers = require('../helpers/university.helper');

module.exports = {
    getAll: async (req, res, next) => {
        try{
            let students = await Student.find().populate('university');
            res.json(students);
        }catch(err){
            res.json({error: err, msg: "Couldn't retrieve students list"});
        }
    },
    create: async (req, res, next) => {
        try{
            let uni = await universityHelpers.findUniversity(req.body.university, 'id');
            if(!uni) throw Error("University not found");
            let newStudent = new Student({
                name: req.body.name,
                surname: req.body.surname,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                university: uni._id
            });
            let student = await newStudent.save();
            res.json(student);
        }catch(err){
            res.json({error: err, msg: "Student registration is not available"});
        }
    }
}