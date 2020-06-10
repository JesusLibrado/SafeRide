import Pusher from 'pusher-js';

var pusher = new Pusher('9c9c5f43539e7b63158a', {
    cluster: 'us2',
    forceTLS: true
});

export default pusher;