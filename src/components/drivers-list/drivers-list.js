import React, { Component } from 'react';
import './drivers-list.scss';
import { observer } from 'mobx-react';
import Driver from './driver/driver';

const DriversList = observer(
    class DriversList extends Component {
        constructor(props) {
            super(props);

            this.state = {
                filterValue: ''
            }

            this.handleFilterChange = this.handleFilterChange.bind(this);
        }

        getFilteredDrivers() {
            if (this.state.filterValue) {
                return this.props.store.drivers.filter(
                    (driver) => driver.name.toLowerCase().includes(this.state.filterValue.toLowerCase())
                );
            }

            return this.props.store.drivers;
        }

        handleFilterChange(event) {
            this.setState({ filterValue: event.target.value });
        }

        render() {
            const drivers = this.getFilteredDrivers().map((driver) =>
                <Driver key={driver.id} driver={driver} />
            );

            return (
                <div className="component-container">
                    <div className="component-row component-title">Drivers List</div>

                    <div className="component-devider"></div>

                    <div className="component-row search-container">
                        <i className="material-icons">search</i>
                        <input type="text" value={this.state.filterValue} onChange={this.handleFilterChange} placeholder="Filter name.." />
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
