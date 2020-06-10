import React, { useState, useEffect } from 'react';
import {Marker} from 'react-map-gl';
import {Place} from '@material-ui/icons';

const Stop = (props) => {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [name, setName] = useState('');

    useEffect(()=>setLatitude(props.latitude), [props.latitude]);
    useEffect(()=>setLongitude(props.longitude), [props.longitude]);
    useEffect(()=>setName(props.name), [props.name]);

    return(
        <Marker 
            latitude={latitude} 
            longitude={longitude} 
            offsetLeft={-20} 
            offsetTop={-10}
            >
            <Place fontSize={'small'}/>
        </Marker>
    );
};

export default Stop;