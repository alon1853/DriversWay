import React, { Component } from 'react';
import './drivers-list.scss';
import { observer } from 'mobx-react';

const DriversList = observer(
    class DriversList extends Component {
        render() {
            const drivers = this.props.store.drivers.map((driver) =>
                <li key={driver.id}>{driver.name}</li>
            );

            return (
                <div className="drivers-list-container">
                    <ul>
                        {drivers}
                    </ul>
                </div>
            );
        }
    }
);

export default DriversList;
