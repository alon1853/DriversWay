import React, { Component } from 'react';
import './drivers-list.scss';
import { observer } from 'mobx-react';
import Driver from './driver/driver';

const DriversList = observer(
    class DriversList extends Component {
        constructor(props) {
            super(props);

            this.handleFilterChange = this.handleFilterChange.bind(this);
        }

        handleFilterChange(event) {
            this.props.store.setDriverFilter(event.target.value);
        }

        render() {
            const drivers = this.props.store.filteredDrivers.map((driver) =>
                <Driver key={driver.id} driver={driver} />
            );

            return (
                <div className="component-container">
                    <div className="component-row component-title">Drivers List</div>

                    <div className="component-devider"></div>

                    <div className="component-row search-container">
                        <i className="material-icons">search</i>
                        <input type="text"
                            value={this.props.store.driverFilter}
                            onChange={this.handleFilterChange}
                            placeholder="Filter name.."
                        />
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
