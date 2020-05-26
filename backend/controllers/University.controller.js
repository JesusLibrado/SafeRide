const University = require('../models/University');
const universityHelper = require('../helpers/university.helper');
const locationHelper = require('../helpers/location.helper');

module.exports = {
    getAll: async (req, res, next) => {
        try{
            let universities = await University.find();
            res.json(universities);
        }catch(err) {
            res.json({error: err, msg: "Couldn't retrieve universities list"});
        }
    },
    create: async (req, res, next) => {
        let newUni = new University(req.body);
        try{
            let uni = await newUni.save();
            res.json(uni);
        }catch(err){
            res.json({error: err, msg: "Could not register Universty"});
        }
    },
    update: async (req, res, next) => {
        let _id = await universityHelper.findUniversity(req.params.shortName, 'id');
        let location_obj = await locationHelper.findLocationByName(req.body.locationName);
        if(!location_obj) {res.json({error: "Location not found"});return;}
        await University.updateOne(_id, {location: location_obj});
        res.json({msg: "University updated!"});
    }
}