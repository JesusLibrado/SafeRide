const Trip = require('../models/Trip');
const Student = require('../models/Student');
const Driver = require('../models/Driver');
const Stop = require('../models/Stop');
const driverHelper =require('../helpers/driver.helper');
const stopHelper =require('../helpers/stop.helper');
const studentHelper=require('../helpers/student.helper');

// Helper function to check if an array of Mongoose ObjectIds contain an element
function contains(arr, elem) {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i].toString() === elem) {
            return true;
        }
    }

    return false;
}

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

        Trip.findOne({'_id': req.params.trip_id}, (err, trip) => {
            console.log(trip);

            if(err || !trip) {
                return res.json({error: err, msg: 'Could not find trip'});
            }

            Student.findOne({'_id': req.params.student_id}, (err, student) => {
                console.log(student);

                if(err || !student) {
                    return res.json({error: err, msg: 'Could not find student'});
                }

                if(trip.availableSeats <= 0) {
                    return res.json({error: Error('availableSeats <= 0'), msg: "No more seats available on this trip"});
                }

                if(contains(trip.passengers, req.params.student_id)) {
                    // Silently succeed with no other effect
                    return res.json(trip);
                }

                trip.passengers.push(req.params.student_id);
                trip.availableSeats -= 1;

                trip.save();

                res.json(trip);
            });
        });
    }
}