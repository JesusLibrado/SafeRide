import React, { useEffect, useState } from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
import { green, grey } from '@material-ui/core/colors';
import axios from 'axios';
import { 
    TextField, 
    Card, 
    CardHeader, 
    CardContent, 
    CardActions, 
    Button,
    CircularProgress
} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';

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
    const [coords, setCoords] = useState({latitude: 0, longitude: 0});
    const [inputValue, setInputValue] = useState('');
    const [value, setValue] = useState('');
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);

    useEffect(()=>{
      if(value == ''){
        axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${props.coords.longitude},${props.coords.latitude}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
        .then(response=>response.data.features)
        .then(features=>features.map(feature=>{return {name: feature.place_name, types: feature.place_type}}))
        .then(objects=>objects.filter((o)=>{ 
          for (let type of o.types){
            return (type === 'address' || type === 'postcode' || type === 'neighborhood');
          }
        }).map(place=>place.name))
        .then(results=>{
          setInputValue(results[0]);
          setOptions(results.slice(1,4));
        });
      }
      return () => {
        setValue(inputValue);
      }
    }, [props.coords]);

    const fetchPlaces = (e, newInputValue) => {
      e.preventDefault();
      setInputValue(newInputValue);
      axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(newInputValue)}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}&autocomplete=true`)
      .then(response=>response.data.features)
      .then(array=>array.map(feature=>feature.place_name).slice(0,4))
      .then(names=>setOptions(names));
    }

    return(
        <Card style={{maxWidth: 500}}>
            <CardHeader
                title="Schedule" 
                subheader="Enter pick up information"
            />
            <CardContent>
              <Autocomplete
                autoComplete
                autoHighlight
                fullWidth
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={fetchPlaces}
                id="pickup-address"
                options={options}
                renderInput={(params) => <TextField {...params} fullWidth label="Your address"/>}
              />
            </CardContent>
            <CardActions >
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