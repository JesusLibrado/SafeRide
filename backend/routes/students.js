var express = require('express');
var router = express.Router();
var StudentController = require('../controllers/Student.controller');

router.get('/', StudentController.getAll);
router.post('/', StudentController.create);

module.exports = router; 