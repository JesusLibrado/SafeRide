import React, {useEffect, useState} from 'react';
import {
   Paper, Card, Grid, Typography
} from '@material-ui/core';
import axios from 'axios';
import Map from './Map';
import JoinTripButton from './JoinTripButton';

const params = {
    viewport: {
        latitude: 19.023840,
        longitude: -98.243571,
        zoom: 14,
        bearing: 0,
        pitch: 0
    },
    me: {
        latitude: 19.023840,
        longitude: -98.243571
    }
}

const Trips = (props) => {
    const [trips, setTrips] = useState([]);

    useEffect(()=>{
        let mounted = true;
        axios.get(`http://${process.env.REACT_APP_API_URL}/trips`)
        .then(res=>res.data)
        .then(tps=>{if(mounted){setTrips(tps)}});
        return () => mounted = false;
    }, [trips]);

    return (
        <div>
            {trips.map((trip)=>
                <Paper elevation={0} key={trip.id}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm>
                            <Map markers={trip.stops.map(stop=>{
                                let loc = stop.location;
                                    return{
                                        name: loc.name,
                                        longitude: loc.location.coordinates[0],
                                        latitude: loc.location.coordinates[1]
                                    }
                                })
                                } 
                                {...params}
                            />
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                    Standard license
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                    Full resolution 1920x1080 • JPEG
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                    ID: 1030114
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <JoinTripButton studentId={trip.driver.student} tripId={trip.id}/>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">$19.00</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            )}
        </div>
    );
}

export default Trips;