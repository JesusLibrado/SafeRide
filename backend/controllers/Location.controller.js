const Location = require('../models/Location');
const Point = require('../models/Point');
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
        try{
            let point = new Point({type: 'Point', coordinates: req.body.coordinates});
            let newLocation = new Location({name: req.body.name, location: point});
            let location = await newLocation.save();
            res.json(location);
        }catch(err){
            res.json({error: err, msg: "Location registration failed"});
        }
    },
    getByName: async (req, res, next) => {
        let location = await locationHelper.findLocationByName(req.params.name, 'location');
        res.json(location);
    },
    getByProximity: async (req, res, next) => {
        if(req.query.longitude){
            var coords = [Number(req.query.longitude), Number(req.query.latitude)];
            let locations = await locationHelper.getLocationsNearCoords(coords);
            res.json(locations);
        }
        if(req.query.location_name){
            let locations = await locationHelper.getLocationsNearName(req.query.location_name);
            res.json(locations);
        }
        
        
    }
}