var Pusher = require('pusher');

var pusher = new Pusher({
	app_id: "1014925",
	key: "9c9c5f43539e7b63158a",
	secret: "801c756ac69d1722af3f",
	cluster: "us2",
	encrypted: true
});

module.exports = pusher;