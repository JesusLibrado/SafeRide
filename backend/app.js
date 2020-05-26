var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var universitiesRouter = require('./routes/universities');
var driversRouter = require('./routes/drivers');
var studentsRouter = require('./routes/students');
var locationsRouter = require('./routes/locations');
var tripsRouter = require('./routes/trips');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/students', studentsRouter);
app.use('/api/drivers', driversRouter);
app.use('/api/universities', universitiesRouter);
app.use('/api/locations', locationsRouter);
app.use('/api/trips', tripsRouter);

module.exports = app;
