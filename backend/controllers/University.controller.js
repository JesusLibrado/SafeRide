const University = require('../models/University');

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
    }
}