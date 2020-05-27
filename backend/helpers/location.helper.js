const Location = require('../models/Location');
const Point = require('../models/Point');

exports.findLocationByName = async (name, fields = '')=> {
    return await Location.findOne({name: name}, fields);
}

exports.getLocationsNearCoords = async (coords) => {
    let nearLocations = await Location.find({
        location: {
            $geoWithin: {
                $center: [coords, 0.02]
             }
        }
    });
    return nearLocations;
}

exports.getLocationsNearName = async (location_name) => {
    let location = await this.findLocationByName(location_name, 'location');
    let nearLocations = await Location.find()
    .where('location')
    .within({ center: location.location.coordinates, radius: 1})
    return nearLocations;
}