var express = require('express');
var router = express.Router();
var TripController = require('../controllers/Trip.controller');

router.get('/', TripController.getAll);
router.get('/:trip_id', TripController.getById);
router.post('/', TripController.create);
router.post('/:trip_id/join/:student_id', TripController.requestToJoin);

module.exports = router; 