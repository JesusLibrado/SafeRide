import React, { useState, useEffect } from 'react';
import { Card } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import MapGL, {Marker} from 'react-map-gl';
import {PersonPin} from '@material-ui/icons';
import Stop from './Stop';

const useStyles = makeStyles((theme) => ({
    marker: {
        color: green[500]
    }
  }));

const Map = (props) =>{
    const classes = useStyles();
    const [markers, setMarkers] = useState([]);
    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 18,
        bearing: 0,
        pitch: 0
    });
    const [me, setMe] = useState({
        latitude: 0,
        longitude: 0
    });

    
    useEffect(()=>setViewport(props.viewport), [props.viewport]);
    useEffect(()=>setMe(props.me), [props.me]);
    useEffect(()=>setMarkers(props.markers), [props.markers]);

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
                    latitude={me.latitude} 
                    longitude={me.longitude} 
                    offsetLeft={0} 
                    offsetTop={0}
                >
                    <PersonPin className={classes.marker}/>
                </Marker>
                {
                    markers.map((marker)=>
                        <Stop
                            name={marker.name}
                            latitude={marker.latitude} 
                            longitude={marker.longitude}
                            key={marker.name}
                        />)
                }
            </MapGL>
        </Card>
    );
}

export default Map;