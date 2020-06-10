import React, {useEffect, useState} from 'react';
import pusher from '../pusher';
import {
   Paper, Card, Grid, Typography
} from '@material-ui/core';
import axios from 'axios';
import Map from './Map';
import ReplyRequestButton from './ReplyRequestButton';
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

const Trip = (props) => {
    const [trip, setTrip] = useState(null);
    const [driverId, setDriverId] = useState('');
    const [requests, setRequests] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(()=>{
        let channel = pusher.subscribe(`driver_${driverId}`);
        channel.bind('trip_driver_join_request', (data)=>{
          console.log(data);
        });
    });

    useEffect(()=>{
        let mounted = true;
        axios.get(`http://${process.env.REACT_APP_API_URL}/trips/${props.tripId}`)
        .then(res=>res.data)
        .then(tps=>{if(mounted){setTrip(tps)};setDriverId(tps.driver._id);setShow(true)});
        return () => mounted = false;
    }, [props.tripId]);

    return (
        <div>
            {
                show?        
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
                                </Grid>
                                <Grid item>
                                    {requests.map((req)=><ReplyRequestButton requestId={req._id}/>)}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>:null
            }
        </div>
    );
}

export default Trip;