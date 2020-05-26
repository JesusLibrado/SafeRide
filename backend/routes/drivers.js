var express = require('express');
var router = express.Router();
var DriverController = require('../controllers/Driver.controller');

router.get('/', DriverController.getAll);
router.get('/:driver_id/university', DriverController.getUniversity);
router.get('/:driver_id', DriverController.getDriver);
router.post('/', DriverController.create);

module.exports = router; 