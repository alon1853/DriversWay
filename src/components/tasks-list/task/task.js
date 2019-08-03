import React, { Component } from 'react';

class Task extends Component {
    constructor(props) {
        super(props);

        this.handleTaskAssign = this.handleTaskAssign.bind(this);
    }

    getDrivers() {
        return ['', ...Array.from(this.props.drivers.values())];
    }

    handleTaskAssign(event) {
        this.props.assignTaskToDriver(this.props.task.id, Number.parseInt(event.target.value));
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
                    <select value={this.props.task.driverId} onChange={this.handleTaskAssign}>
                        {driversNames}
                    </select>
                </td>
                <td>{this.props.task.address}</td>
                <td>{this.props.task.location.latitude}</td>
                <td>{this.props.task.location.longitude}</td>
                <td><input type="checkbox" /></td>
            </tr>
        );
    }
}

export default Task;