import React, { useState, useEffect } from 'react';
import Map from './Map';
import Scheduler from './Scheduler';
import { 
    Grid
} from "@material-ui/core";
  
const Main = () => {
    const [loading, setLoading] = useState(false);
    const [me, setMe] = useState({
        latitude: 0,
        longitude: 0
    });
    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 14,
        bearing: 0,
        pitch: 0
    });

    navigator.geolocation.getCurrentPosition(position => {
        setViewport({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            zoom: 15,
            bearing: 0,
            pitch: 0
        });
        setMe({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    });

    const search = (e) => {
        e.preventDefault();
        setLoading(true);
        
    }

    return(
        <div>
            <Grid container spacing={2} style={{padding: 50}}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={8}>
                        <Grid key={1} item md={6} lg={6} sm={12} xs={12}>
                            <Map viewport={viewport} me={me}/>
                        </Grid>
                        <Grid key={2} item md={6} lg={6} sm={12} xs={12}>
                            <Scheduler loading={loading} search={search} coords={{latitude: viewport.latitude, longitude: viewport.longitude}}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Main;
