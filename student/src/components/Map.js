import React, { useState, useEffect } from 'react';
import { Card } from "@material-ui/core";
import MapGL, {Marker} from 'react-map-gl';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CarMarker from './CarMarker';

const Map = (props) =>{
    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
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
                width="100%"
                height={400}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                onViewportChange={updateViewport}
            >
                <Marker 
                    latitude={viewport.latitude} 
                    longitude={viewport.longitude} 
                    offsetLeft={0} 
                    offsetTop={0}
                >
                    <LocationOnIcon/>
                </Marker>
                {
                    [1,2,3].map((n)=>
                        <CarMarker 
                            latitude={viewport.latitude+(n*0.001)} 
                            longitude={viewport.longitude}
                            key={n}
                        />)
                }
            </MapGL>
        </Card>
    );
}

export default Map;