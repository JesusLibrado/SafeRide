const Stop = require('../models/Stop');

exports.getNewStop = async (location, priorityNumber) =>{
    return new Stop({location: location, number: priorityNumber});
}