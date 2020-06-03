const Trip = require('../models/Trip');
const driverHelper =require('../helpers/driver.helper');
const stopHelper =require('../helpers/stop.helper');
const studentHelper=require('../helpers/student.helper');

module.exports = {
    getAll: async (req, res, next) => {
        try{
            let trips = await Trip.find().populate('driver').populate('stops');
            res.json(trips);
        }catch(err){
            res.json({error: err, msg: "Couldn't retrieve trips list"});
        }
    },
    create: async (req, res, next) => {
        let driver_id = await driverHelper.getDriverById(req.body.driver_id, 'id');
        let university = await driverHelper.getDriverUniversity(req.body.driver_id, 'location');
        if(!university) {res.json({error: "University has no location set"}); return;}
        let uni_stop = await stopHelper.getNewStop(university.location, 1);
        console.log(uni_stop);
        try{
            let newTrip = new Trip({
                driver: req.body.driver_id,
                availableSeats: req.body.availableSeats
            });
            newTrip.stops.push(uni_stop);
            let trip = await newTrip.save();
            res.json(trip);
        }catch(err){
            res.json({error: err, msg: "Trip declaration was not successful"});
        }
    },
    getById: async (req, res, next) => {
        try{
            let trip = await Trip.findById(req.params.trip_id).populate('driver').populate('stops');
            res.json(trip);
        }catch(err){
            res.json({error: err, msg: "Trip not found"});
        }
    },
    requestToJoin: async (req, res, next) => {
        console.log(req.params);
        let trip_id = await Trip.findById(req.params.trip_id, 'id');
        let student_id = await studentHelper.findStudentById(req.params.student_id, 'id');
        let passengers_array = [];
        passengers_array.push(student_id);
        await Trip.findByIdAndUpdate(trip_id, {passengers: passengers_array});
        console.log(await Trip.findById(trip_id, 'passengers').populate('passengers'));
    }
}