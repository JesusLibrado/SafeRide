var express = require('express');
var router = express.Router();
var DriverController = require('../controllers/Driver.controller');

router.get('/', DriverController.getAll);
router.post('/', DriverController.create);

module.exports = router; 