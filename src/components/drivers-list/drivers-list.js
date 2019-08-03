import React, { Component } from 'react';
import './drivers-list.scss';
import { observer } from 'mobx-react';
import Driver from './driver/driver';

@observer
class DriversList extends Component {
    constructor(props) {
        super(props);

        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.deleteDriver = this.deleteDriver.bind(this);
    }

    handleFilterChange(event) {
        this.props.driversStore.setDriverFilter(event.target.value);
    }

    deleteDriver(driverId) {
        this.props.driversStore.deleteDriver(driverId);
    }

    getTasksForDriver(driverId) {
        return Array.from(
            this.props.tasksStore.driversToTasksMap.get(driverId).values()
        );
    }

    render() {
        const drivers = this.props.driversStore.filteredDrivers.map((driver) =>
            <Driver key={driver.id}
                driver={driver}
                deleteDriver={this.deleteDriver}
                tasks={this.getTasksForDriver(driver.id)}
            />
        );

        return (
            <div className="component-container">
                <div className="component-row component-title">Drivers List</div>

                <div className="component-devider"></div>

                <div className="component-row search-container">
                    <i className="material-icons">search</i>
                    <input type="text"
                        value={this.props.driversStore.driverFilter}
                        onChange={this.handleFilterChange}
                        placeholder="Filter name"
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

export default DriversList;
