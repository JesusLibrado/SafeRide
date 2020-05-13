import React from 'react';
import { Card } from "@material-ui/core";
import MapGL, {Marker} from 'react-map-gl';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const TOKEN = 'pk.eyJ1IjoiYW1hZG8tbmVydm8iLCJhIjoiY2thNTF3NWZ6MThsajNtcjMxeG14YmZ1ayJ9.WmStzO9ET_SlDhIxvmYjhQ';

export class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: 5,
            lat: 34,
            zoom: 2
        };
    }

    componentDidMount() {
        this.setState((state, props)=>({
                lat: props.latitude, lng: props.longitude
            })
        );
    }

    render() {
        return(
            <Card>
                <MapGL
                    latitude={this.props.latitude} 
                    longitude={this.props.longitude}
                    width={400}
                    height={400}
                    zoom={this.props.zoom}
                    mapboxApiAccessToken={TOKEN}
                >
                    <Marker latitude={this.props.latitude} longitude={this.props.longitude} offsetLeft={-20} offsetTop={-10}>
                        <LocationOnIcon />
                    </Marker>
                </MapGL>
            </Card>
        );
    }
}