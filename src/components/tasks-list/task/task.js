import React, { Component } from 'react';

class Task extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.task.title}</td>
                <td>{this.props.task.scheduledFor}</td>
                <td>{this.props.task.driverId}</td>
                <td>{this.props.task.address}</td>
                <td>{this.props.task.location.latitude}</td>
                <td>{this.props.task.location.longitude}</td>
                <td><input type="checkbox" /></td>
            </tr>
        );
    }
}

export default Task;