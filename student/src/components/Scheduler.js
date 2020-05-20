import React, { useEffect } from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
import { green, grey } from '@material-ui/core/colors';
import { 
    Grid, 
    TextField, 
    Card, 
    CardHeader, 
    CardContent, 
    CardActions, 
    Button,
    CircularProgress
} from "@material-ui/core";

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

const Scheduler = (props) => {
    const classes = useStyles();

    return(
        <Card style={{maxWidth: 500}}>
            <CardHeader
                title="Schedule" 
                subheader="Enter pick up information"
            />
            <CardContent>
                <TextField id="pickup-address" label="Enter address" fullWidth/>
            </CardContent>
            <CardActions >
            <Button color="primary">
                Pick location in map
            </Button>
            <div className={classes.wrapper}>
                <Button onClick={props.search} variant="contained" className={classes.buttonSuccess} disabled={props.loading}>
                    Search
                </Button>
                {props.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
            </CardActions>
        </Card>
    );
}

export default Scheduler;