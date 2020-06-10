import React, {useEffect, useState} from 'react';
import pusher from '../pusher';
import { makeStyles } from '@material-ui/core/styles';
import { green, grey } from '@material-ui/core/colors';
import {
   Button
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
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
}));

const JoinTripButton = (props) => {
    const classes = useStyles();
    const [studentId, setStudentId] = useState('');
    const [tripId, setTripId] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setStudentId(props.studentId);
    }, [props.studentId]);

    useEffect(()=>{
        setTripId(props.tripId);
    }, [props.tripId]);

    const requestToJoin = ()=>{
        console.log(studentId, tripId);
    }

    return (
        <div>
            <Button onClick={requestToJoin} variant="contained" className={classes.buttonSuccess} disabled={loading}>
                Join this trip
            </Button>
        </div>
    );
}

export default JoinTripButton;