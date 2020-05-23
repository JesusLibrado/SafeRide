const Location = require('../models/Location');
const GeoPoint = require('../models/GeoPoint');

exports.findLocationByName = async (name, fields = '')=> {
    try{
        return await Location.find({name: name}, fields);
    }catch(err){
        return Error(err);
    }
}