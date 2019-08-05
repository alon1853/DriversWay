import React from 'react';
import './app.scss';
import DriversMap from '../drivers-map/drivers-map';
import DriversList from '../drivers-list/drivers-list';
import observableDriversList from '../../stores/drivers-store';
import TasksList from '../tasks-list/tasks-list';
import observableTasksList from '../../stores/tasks-store';
import observableDriversMapStore from '../../stores/drivers-map-store';

function App() {
    return (
        <div className="app-container">
            <header>
                <h1>
                    <span role="img" aria-label="truck">🏄🏻‍♂️</span>
                    <span> Drivers Way</span>
                </h1>
            </header>

            <div className="first-row">
                <div className="first">
                    <DriversList driversStore={observableDriversList}
                        tasksStore={observableTasksList}
                        driversMapStore={observableDriversMapStore}
                    />
                </div>

                <div className="space"></div>

                <div className="second">
                    <DriversMap driversStore={observableDriversList}
                        tasksStore={observableTasksList}
                        driversMapStore={observableDriversMapStore}
                    />
                </div>
            </div>

            <TasksList tasksStore={observableTasksList}
                driversStore={observableDriversList}
                driversMapStore={observableDriversMapStore} />
        </div>
    );
}

export default App;
