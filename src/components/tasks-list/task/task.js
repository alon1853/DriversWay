import React, { Component } from 'react';

class Task extends Component {
    constructor(props) {
        super(props);

        this.handleTaskAssign = this.handleTaskAssign.bind(this);
        this.handleToggleDisplayTask = this.handleToggleDisplayTask.bind(this);
    }

    getDrivers() {
        return ['', ...this.props.drivers];
    }

    handleTaskAssign(event) {
        this.props.assignTaskToDriver(this.props.task.id, Number.parseInt(event.target.value));
    }

    handleToggleDisplayTask(event) {
        this.props.toggleDisplayTask(this.props.task.id);
    }

    getDriverId() {
        const driverId = this.props.task.driverId;

        if (driverId === undefined || driverId === null) {
            return '';
        }

        return driverId;
    }

    render() {
        const driversNames = this.getDrivers().map((driver, index) =>
            <option key={index} value={driver.id}>{driver.name}</option>
        );

        return (
            <tr>
                <td>{this.props.task.title}</td>
                <td>{this.props.task.scheduledFor}</td>
                <td>
                    <select value={this.getDriverId()} onChange={this.handleTaskAssign}>
                        {driversNames}
                    </select>
                </td>
                <td>{this.props.task.address}</td>
                <td>{this.props.task.location.latitude}</td>
                <td>{this.props.task.location.longitude}</td>
                <td><input type="checkbox" checked={this.props.checked} onChange={this.handleToggleDisplayTask} /></td>
            </tr>
        );
    }
}

export default Task;