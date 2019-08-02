import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Task from './task/task';

const TasksList = observer(
    class TasksList extends Component {
        render() {
            const tasks = this.props.store.tasks.map((task) =>
                <Task key={task.id} task={task} />
            );

            return (
                <div>
                    <div className="component-container">
                        <div className="component-row component-title">Tasks List</div>

                        <div className="component-devider"></div>

                        <div className="component-row">
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
                </div>
            );
        }
    }
);

export default TasksList;