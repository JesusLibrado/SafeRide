import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import {
   Card, CardHeader, Avatar
} from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));

const Driver = (props) =>{
    const classes = useStyles();
    const [driver, setDriver] = useState({student: {fullName: 'asd', phoneNumber: ''}});

    useEffect(()=>{
        axios.get(`http://${process.env.REACT_APP_API_URL}/drivers/${props.driverId}`)
        .then(res=>res.data)
        .then(data=>setDriver(data));
    }, [props.driverId]);

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        I
                    </Avatar>
                }
                title={driver.student.fullName}
                subheader={driver.student.phoneNumber}
            />
        </Card>
    );
}

export default Driver;