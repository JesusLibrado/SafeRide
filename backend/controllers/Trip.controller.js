const Trip = require('../models/Trip');
const Student = require('../models/Student');
const Driver = require('../models/Driver');
const Stop = require('../models/Stop');
const JoinRequest = require('../models/JoinRequest')
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

                try{
                    let newJoinRequest = new JoinRequest({
                        driver: trip.driver,
                        student: req.params.student_id,
                        status: 'pending'
                    });

                    newJoinRequest.save();

                    // Accept/reject via Pusher
                    pusher.trigger('driver_'+trip.driver, 'trip_driver_join_request', {student: student, trip: trip});
                    pusher.trigger('student_'+req.params.student_id, 'trip_student_join_request', {msg: 'We are processing your request'});

                    res.json(newJoinRequest);
                }catch(err){
                    res.json({error: err, msg: "New join request declaration was not successful"});
                }
            });
        });
    },
    joinRequestControl: async (req, res, next) => {
        JoinRequest.findById(req.params.request_id, (err, joinRequest) => {
            if(err | !joinRequest) {
                return res.json({error: err, msg: 'Could\'nt find join request'});
            }

            if(joinRequest.status !== 'pending') {
                return res.json({
                    error: Error('Status decided'),
                    msg: 'The status of this joining request has already been decided: '+joinRequest.status
                });
            }

            switch(req.params.action) {
                case 'accept':
                    Trip.findOne({'_id': joinRequest.trip}, (err, trip) => {
                        console.log(trip);
            
                        if(err || !trip) {
                            return res.json({error: err, msg: 'Could not find trip'});
                        }
            
                        Student.findOne({'_id': joinRequest.student}, (err, student) => {
                            console.log(student);
            
                            if(err || !student) {
                                return res.json({error: err, msg: 'Could not find student'});
                            }
            
                            if(trip.availableSeats <= 0) {
                                return res.json({error: Error('availableSeats <= 0'), msg: "No more seats available on this trip"});
                            }
            
                            if(contains(trip.passengers, joinRequest.student)) {
                                // Silently succeed with no other effect
                                return res.json(trip);
                            }
            
                            // Pusher notice
                            pusher.trigger('student_'+joinRequest.student, 'trip_student_join_request', {msg: 'You have been accepted to this trip', trip: trip});


                            // Trip modifications
                            trip.passengers.push(joinRequest.student);
                            trip.availableSeats -= 1;
                            trip.save();

                            // JoinRequest modifications
                            joinRequest.status = 'accepted';
                            joinRequest.save();

                            // Return success signal
                            res.json({status: true, msg: 'Student joined trip successfully'});
                        });
                    });

                    break;

                    case 'reject':
                        Trip.findOne({'_id': joinRequest.trip}, (err, trip) => {
                            console.log(trip);
                
                            if(err || !trip) {
                                return res.json({error: err, msg: 'Could not find trip'});
                            }
                
                            Student.findOne({'_id': joinRequest.student}, (err, student) => {
                                console.log(student);
                
                                if(err || !student) {
                                    return res.json({error: err, msg: 'Could not find student'});
                                }
    
                
                                // Pusher notice
                                pusher.trigger('student_'+joinRequest.student, 'trip_student_join_request', {msg: 'You have been rejected from this trip', trip: trip});
    
    
                                // JoinRequest modifications
                                joinRequest.status = 'rejected';
                                joinRequest.save();
    
                                // Return success signal
                                res.json({status: true, msg: 'Rejected student from trip'});
                            });
                        });
    
                        break;

                default:
                    res.json({error: Error('Unexpected action'), msg: 'Unexpected action'});
                    break;
            }
        });
    }
}