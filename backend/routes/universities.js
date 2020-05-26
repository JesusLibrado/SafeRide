var express = require('express');
var router = express.Router();
var UniversityController = require('../controllers/University.controller');

router.get('/', UniversityController.getAll);
router.post('/', UniversityController.create);
router.put('/:shortName/updateLocation', UniversityController.update);

module.exports = router; 