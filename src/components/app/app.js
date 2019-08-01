import React from 'react';
import './app.scss';
import Map from '../map/map';
import DriversList from '../drivers-list/drivers-list';

function App() {
    return (
        <div className="app-container">
            <header>
                <h1>
                    <span role="img" aria-label="truck">🚚</span>
                    <span>Drivers Way</span>
                </h1>
            </header>
            <div className="content">
                <DriversList />
                <Map />
            </div>
        </div>
    );
}

export default App;
