import React, { Component } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api'

export default class Map extends Component {
    render() {
        return (
            <LoadScript
                id="script-loader"
                googleMapsApiKey="AIzaSyAN_EO-3YSviU5C3zQDGpupte7C5KlGiPw"
            >
                <GoogleMap
                    id='example-map'
                    mapContainerStyle={{
                        height: "100%",
                        width: "100%"
                    }}
                    zoom={7}
                    center={{
                        lat: -3.745,
                        lng: -38.523
                    }}
                >
                </GoogleMap>
            </LoadScript>
        );
    }
}
