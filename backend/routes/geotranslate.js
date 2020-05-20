var express = require('express');
var router = express.Router();
const Controller = require('../controllers/Geotranslate.controller');

router.get('/', Controller.translate);

module.exports = router;