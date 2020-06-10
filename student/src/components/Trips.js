import React, {useEffect, useState} from 'react';
import {
   Paper, Card, Grid, Typography
} from '@material-ui/core';
import axios from 'axios';
import Map from './Map';
import JoinTripButton from './JoinTripButton';
import Driver from './Driver';

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

    // const getUniversityShortName = async (driverId) =>{
    //     let uniObj = await axios.get(`http://${process.env.REACT_APP_API_URL}/drivers/${driverId}/university`);
    //     return uniObj.data.shortName;
    // }

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
                                    <Driver driverId={trip.driver._id}/>

                                    <Typography gutterBottom variant="subtitle1">
                                        Only {trip.availableSeats} seats avaialable
                                    </Typography>
                                    <Typography variant="body2"  gutterBottom color="textPrimary">
                                        {trip.driver.plates}
                                    </Typography>
                                    {/* <Typography gutterBottom variant="body2" color="textSecondary">
                                        {getUniversityShortName(trip.driver._id)}
                                    </Typography> */}
                                </Grid>
                                <Grid item>
                                    <JoinTripButton studentId={trip.driver.student} tripId={trip.id}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            )}
        </div>
    );
}

export default Trips;