var express = require('express');
var router = express.Router();
var StudentController = require('../controllers/Student.controller');

/* GET home page. */
router.get('/', StudentController.getAll);

module.exports = router;