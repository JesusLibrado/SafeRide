import React, { useState, useEffect } from 'react';
import {Marker} from 'react-map-gl';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';

const CarMarker = (props) => {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    useEffect(()=>setLatitude(props.latitude), [props.latitude]);
    useEffect(()=>setLongitude(props.longitude), [props.longitude]);

    return(
        <Marker latitude={latitude} longitude={longitude} offsetLeft={-20} offsetTop={-10}>
            <DirectionsCarIcon color={"primary"}/>
        </Marker>
    );
};

export default CarMarker;