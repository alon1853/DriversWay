import React from 'react';
import './app.scss';
import DriversMap from '../drivers-map/drivers-map';
import DriversList from '../drivers-list/drivers-list';
import observableDriversList from '../../stores/drivers-store';
import TasksList from '../tasks-list/tasks-list';
import observableTasksList from '../../stores/tasks-store';

function App() {
    return (
        <div className="app-container">
            <header>
                <h1>
                    <span role="img" aria-label="truck">🚚</span>
                    <span> Drivers Way</span>
                </h1>
            </header>

            <div className="first-row">
                <div className="first">
                    <DriversList driversStore={observableDriversList} tasksStore={observableTasksList} />
                </div>

                <div className="space"></div>

                <div className="second">
                    <DriversMap driversStore={observableDriversList} tasksStore={observableTasksList} />
                </div>
            </div>

            <div className="second-row">
                <TasksList tasksStore={observableTasksList} driversStore={observableDriversList} />
            </div>
        </div>
    );
}

export default App;
