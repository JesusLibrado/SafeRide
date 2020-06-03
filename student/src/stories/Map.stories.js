import React from 'react';
import Map from '../components/Map';
import axios from 'axios';

export default {
    title: 'Map',
    component: Map
};

const params = {
    markers: [],
    viewport: {
        latitude: 19.023840,
        longitude: -98.243571,
        zoom: 15,
        bearing: 0,
        pitch: 0
    },
    me: {
        latitude: 19.023840,
        longitude: -98.243571
    }
};

const stops = {
    markers: []
}

axios.get(`http://${process.env.REACT_APP_API_URL}/locations/near?longitude=-98.243571&latitude=19.023840`)
.then(res=>res.data)
.then(array=>stops.markers = array);
  
export const Default = () => <Map {...params} />

export const Stops = () => <Map {...params} {...stops}/>