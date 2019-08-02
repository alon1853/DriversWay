import React, { Component } from 'react';
import './drivers-list.scss';
import { observer } from 'mobx-react';
import Driver from './driver/driver';

const DriversList = observer(
    class DriversList extends Component {
        render() {
            const drivers = this.props.store.drivers.map((driver) =>
                <Driver key={driver.id} driver={driver} />
            );

            return (
                <div className="component-container">
                    <div className="component-row component-title">Drivers List</div>

                    <div className="component-devider"></div>

                    <div className="component-row search-container">
                        <i className="material-icons">search</i>
                        <input type="text" placeholder="Filter name.." />
                    </div>

                    <div className="component-devider"></div>

                    <div className="component-row">
                        {drivers}
                    </div>
                </div>
            );
        }
    }
);

export default DriversList;
