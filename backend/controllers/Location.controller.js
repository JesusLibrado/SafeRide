const Location = require('../models/Location');
const GeoPoint = require('../models/GeoPoint');
const locationHelper = require('../helpers/location.helper');

module.exports = {
    getAll: async (req, res, next) => {
        try{
            let locations = await Location.find();
            res.json(locations);
        }catch(err) {
            res.json({error: err, msg: "Couldn't retrieve Locations list"});
        }
    },
    create: async (req, res, next) => {
        console.log(req.body);
        try{
            let point = new GeoPoint({type: 'GeoPoint', coordinates: req.body.coordinates});
            let newLocation = new Location({name: req.body.name, location: point});
            let location = await newLocation.save();
            res.json(location);
        }catch(err){
            res.json({error: err, msg: "Location registration failed"});
        }
    },
    get: async (req, res, next) => {
        console.log(req.param);
    }
}