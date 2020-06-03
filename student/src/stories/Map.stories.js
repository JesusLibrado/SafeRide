import React from 'react';
import Map from '../components/Map';

export default {
    title: 'Map',
    component: Map
};

const params = {
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
  
export const Default = () => <Map {...params}/>