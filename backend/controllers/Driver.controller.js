const Driver = require('../models/Driver');
const studentHelper = require('../helpers/student.helper');

module.exports = {
    getAll: async (req, res, next) => {
        try{
            let drivers = await Driver.find().populate('student');
            res.json(drivers);
        }catch(err) {
            res.json({error: err, msg: "Couldn't retrieve drivers list"});
        }
    },
    create: async (req, res, next) => {
        try{
            let student = await studentHelper.findStudent(req.body.student, 'id');
            if(!student) throw Error("Student not found");
            let newDriver = new Driver({
                student: student._id,
                plates: req.body.plates,
                carModel: req.body.cardModel
            });
            let driver = await newDriver.save();
            res.json(driver);
        }catch(err){
            console.log(err);
            res.json({error: err, msg: "Driver registration unsuccessful"});
        }
    },
    getDriver: async (req, res, next) => {
        try{
            let driver = await Driver.findById(req.params.driver_id)
            .populate('student');
            res.json(driver);
        }catch(err) {
            res.json({error: err, msg: "Couldn't retrieve driver's university"});
        }
    },
    getUniversity: async (req, res, next) => {
        try{
            let driver = await Driver.findById(req.params.driver_id)
            .populate({path: 'student', 
                populate: {
                    path: 'university', 
                    select: 'name shortName location'
                }
            });
            res.json(driver.student.university);
        }catch(err) {
            res.json({error: err, msg: "Couldn't retrieve driver's university"});
        }
    }
}