import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { green, grey, red } from '@material-ui/core/colors';
import {
   Button, ButtonGroup
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
    buttonDanger: {
        color: '#ffffff',
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[700],
        },
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

const ReplyRequestButton = (props) => {
    const classes = useStyles();
    const [requestId, setRequestId] = useState('');

    useEffect(()=>{
        setRequestId(props.requestId);
    }, [props.requestId]);

    const respondRequest = (action)=>{
      axios.post(`http://${process.env.REACT_APP_API_URL}/trips/joinrequest/${props.requestId}/${action}`)
      .then(res=>res.data)
      .then(data=>console.log(data));
    }

    return (
          <div className={classes.wrapper}>
            <ButtonGroup disableElevation variant="contained">
                <Button onClick={respondRequest('accept')} variant="contained" className={classes.buttonSuccess}>
                    Accept request
                </Button>
                <Button onClick={respondRequest('reject')} variant="contained" className={classes.buttonDanger}>
                    Deny request
                </Button>
            </ButtonGroup>
          </div>
    );
}

export default ReplyRequestButton;