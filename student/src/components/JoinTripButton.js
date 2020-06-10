import React, {useEffect, useState} from 'react';
import pusher from '../pusher';
import { makeStyles } from '@material-ui/core/styles';
import { green, grey } from '@material-ui/core/colors';
import {
   Button, CircularProgress
} from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
    buttonSuccess: {
      color: grey[50],
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
    fabProgress: {
      color: green[500],
      position: 'absolute',
      top: -6,
      left: -6,
      zIndex: 1,
    },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      marginTop: -12,
    },
}));

const JoinTripButton = (props) => {
    const classes = useStyles();
    const [studentId, setStudentId] = useState('');
    const [tripId, setTripId] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
      setStudentId(props.studentId);
      console.log(`student_${props.studentId}`);
      let channel = pusher.subscribe(`student_${props.studentId}`);
      channel.bind('trip_student_join_request', (data)=>{
        console.log(data);
      });
    }, [props.studentId]);

    useEffect(()=>{
        setTripId(props.tripId);
    }, [props.tripId]);

    const requestToJoin = ()=>{
      axios.post(`http://${process.env.REACT_APP_API_URL}/trips/${tripId}/join/${studentId}`)
      .then(res=>res.data)
      .then(data=>{setLoading(true);console.log(data)})
    }

    return (
          <div className={classes.wrapper}>
            <Button onClick={requestToJoin} variant="contained" className={classes.buttonSuccess} disabled={loading}>
              Join this trip
            </Button>
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
    );
}

export default JoinTripButton;