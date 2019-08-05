import React, { Component } from 'react';
import './tasks-list.scss';
import { observer } from 'mobx-react';
import { values } from 'mobx';
import Task from './task/task';

@observer
class TasksList extends Component {
    constructor(props) {
        super(props);

        this.assignTaskToDriver = this.assignTaskToDriver.bind(this);
        this.toggleDisplayTask = this.toggleDisplayTask.bind(this);
    }

    assignTaskToDriver(taskId, driverId) {
        this.props.tasksStore.assignTaskToDriver(taskId, driverId);
    }

    toggleDisplayTask(taskId) {
        this.props.driversMapStore.toggleDisplayTask(taskId);
    }

    render() {
        const tasks = this.props.tasksStore.filteredTasks.map((task) =>
            <Task key={task.id}
                task={task}
                drivers={values(this.props.driversStore.driversMap)}
                assignTaskToDriver={this.assignTaskToDriver}
                checked={this.props.driversMapStore.displayedTasks.has(task.id)}
                toggleDisplayTask={this.toggleDisplayTask}
            />
        );

        return (
            <div className="component-container">
                <div className="component-row component-title">Tasks List</div>

                <div className="component-devider"></div>

                <div className="component-row table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Scheduled For</th>
                                <th>Assign To</th>
                                <th>Address</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                                <th>Display</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default TasksList;