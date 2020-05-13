import React from 'react';
import { Grid, TextField, Card, CardHeader, CardContent, CardActions, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {Map} from './Map';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));
  
export default class Main extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {latitude: 0, longitude: 0, zoom: 8};
      }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        });
    }

    render() {
        return (
            <div>
                <Grid container spacing={2} style={{padding: 50}}>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={8}>
                            <Grid key={1} item>
                                <Map latitude={this.state.latitude} longitude={this.state.longitude} zoom={this.state.zoom}/>
                            </Grid>
                            <Grid key={2} item>
                                <Card style={{width: 400}}>
                                    <CardHeader
                                        title="Schedule"
                                        subheader="Enter pick up information"
                                    />
                                    <CardContent>
                                        <TextField id="pickup-address" label="Enter address" fullWidth/>
                                    </CardContent>
                                    <CardActions >
                                    <Button color="primary">
                                        Ubicación actual
                                    </Button>
                                    <Button variant="contained" color="secondary">
                                        Buscar
                                    </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}