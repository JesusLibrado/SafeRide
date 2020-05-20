const fetch = require('node-fetch');

module.exports = {
    translate: (req, res) => {
        console.log("BODY", req.body);
        console.log("TOKEN", process.env.MAPBOX_TOKEN);
        res.send("exito");
    }
}