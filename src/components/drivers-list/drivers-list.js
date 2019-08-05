import React, { Component } from 'react';
import './drivers-list.scss';
import { observer } from 'mobx-react';
import { values } from 'mobx';
import Driver from './driver/driver';

@observer
class DriversList extends Component {
    constructor(props) {
        super(props);

        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.deleteDriver = this.deleteDriver.bind(this);
        this.locateDriver = this.locateDriver.bind(this);
    }

    handleFilterChange(event) {
        this.props.driversStore.setDriverFilter(event.target.value);
    }

    deleteDriver(driverId) {
        this.props.driversStore.deleteDriver(driverId);
    }

    locateDriver(driverId) {
        if (this.props.driversStore.driversMap.has(driverId)) {
            const driverLocation = this.props.driversStore.driversMap.get(driverId).location;
            this.props.driversMapStore.setMapCenter([driverLocation.longitude, driverLocation.latitude]);
        }
    }

    getTasksForDriver(driverId) {
        if (this.props.tasksStore.driversToTasksMap.has(driverId)) {
            return values(this.props.tasksStore.driversToTasksMap.get(driverId));
        }

        return [];
    }

    render() {
        const drivers = this.props.driversStore.filteredDrivers.map((driver) =>
            <Driver key={driver.id}
                driver={driver}
                deleteDriver={this.deleteDriver}
                locateDriver={this.locateDriver}
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
                    <i className="material-icons">sort</i>
                    <div style={{ marginLeft: '10px', display: 'inline-flex' }}>
                        <span className="sortButton">
                            Name<i className="material-icons">arrow_drop_down</i>
                        </span>

                        <span className="sortButton">
                            Age<i className="material-icons">arrow_drop_down</i>
                        </span>
                    </div>
                </div >

                <div className="component-devider"></div>

                <div className="component-row drivers-list">
                    {drivers}
                </div>
            </div >
        );
    }
}

export default DriversList;
