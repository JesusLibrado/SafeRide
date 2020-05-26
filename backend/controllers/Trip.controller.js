const Trip = require('../models/Trip');

module.exports = {
    getAll: async (req, res, next) => {
        try{
            let trips = await Trips.find();
            res.json(trips);
        }catch(err){
            res.json({error: err, msg: "Couldn't retrieve trips list"});
        }
    },
    create: async (req, res, next) => {
        try{
            res.json(req.body);
        }catch(err){
            res.json({error: err, msg: "Trip declaration was not successful"});
        }
    }
}