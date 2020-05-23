const Driver = require('../models/Driver');

module.exports = {
    getAll: async (req, res, next) => {
        try{
            let drivers = await Driver.find();
            res.json(drivers);
        }catch(err) {
            res.json({error: err, msg: "Couldn't retrieve drivers list"});
        }
    },
    create: async (req, res, next) => {

    }
}