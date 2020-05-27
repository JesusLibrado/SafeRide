var express = require('express');
var router = express.Router();
var LocationController = require('../controllers/Location.controller');

router.get('/', LocationController.getAll);
router.get('/:name/find', LocationController.getByName);
router.get('/near', LocationController.getByProximity);

router.post('/', LocationController.create);

module.exports = router; 