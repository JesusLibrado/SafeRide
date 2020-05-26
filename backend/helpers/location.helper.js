const Location = require('../models/Location');
const GeoPoint = require('../models/GeoPoint');

exports.findLocationByName = async (name, fields = '')=> {
    return await Location.findOne({name: name}, fields);
}

exports.getLocationsNear = async (longitude, latitude) => {
    
}