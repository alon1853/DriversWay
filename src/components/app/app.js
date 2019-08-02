import React from 'react';
import './app.scss';
import Map from '../map/map';
import DriversList from '../drivers-list/drivers-list';
import observableDriversList from '../../stores/drivers-store';

function App() {
    return (
        <div className="app-container">
            <header>
                <h1>
                    <span role="img" aria-label="truck">🚚</span>
                    <span> Drivers Way</span>
                </h1>
            </header>

            <div className="content">
                <div className="first">
                    <DriversList store={observableDriversList} />
                </div>

                <div className="second">
                    <Map />
                </div>
            </div>
        </div>
    );
}

export default App;
