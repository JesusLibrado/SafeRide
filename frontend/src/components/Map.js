import React, { useState, useEffect } from 'react';
import { Card } from "@material-ui/core";
import MapGL, {Marker} from 'react-map-gl';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const TOKEN = 'pk.eyJ1IjoiYW1hZG8tbmVydm8iLCJhIjoiY2thNTF3NWZ6MThsajNtcjMxeG14YmZ1ayJ9.WmStzO9ET_SlDhIxvmYjhQ';


const Map = (props) =>{
    const [viewport, setViewport] = useState({
        latitude: -19,
        longitude: -10,
        zoom: 15,
        bearing: 0,
        pitch: 0
    });
    
    useEffect(()=>setViewport(props.viewport), [props.viewport]);

    const updateViewport = (object) =>{
        setViewport(object);
    }
    
    return(
        <Card>
            <MapGL
                {...viewport}
                width={400}
                height={400}
                mapboxApiAccessToken={TOKEN}
                onViewportChange={updateViewport}
            >
                <Marker latitude={viewport.latitude} longitude={viewport.longitude} offsetLeft={-20} offsetTop={-10}>
                    <LocationOnIcon/>
                </Marker>
            </MapGL>
        </Card>
    );
}

export default Map;