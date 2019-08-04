import React, { Component } from 'react';
import { observer } from 'mobx-react';
import 'leaflet/dist/leaflet.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import truck from './truck.svg';
import flag from './flag.svg';

@observer
class DriversMap extends Component {
    render() {
        const position = [51.505, -0.09];

        const truckIcon = new L.Icon({
            iconUrl: truck,
            iconSize: [28, 28]
        });
        const flagIcon = new L.Icon({
            iconUrl: flag,
            iconSize: [28, 28]
        });

        const driversMarkers = this.props.driversStore.filteredDrivers.map(driver =>
            <Marker key={driver.id} position={[driver.location.longitude, driver.location.latitude]} icon={truckIcon}>
                <Popup>{driver.name}</Popup>
            </Marker>
        );

        const tasksMarkers = this.props.tasksStore.filteredTasks.map(task =>
            <Marker key={task.id} position={[task.location.longitude, task.location.latitude]} icon={flagIcon}>
                <Popup>{task.title}</Popup>
            </Marker>
        );

        return (
            <Map center={position} zoom={13} style={{ "width": "100%", "height": "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {driversMarkers}
                {tasksMarkers}
            </Map>
        );
    }
}

export default DriversMap;