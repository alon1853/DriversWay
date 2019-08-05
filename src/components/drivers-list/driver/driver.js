import React, { Component } from 'react';
import './driver.scss';

class Driver extends Component {
    constructor(props) {
        super(props);

        this.handleRemove = this.handleRemove.bind(this);
        this.handleLocate = this.handleLocate.bind(this);
    }

    handleRemove() {
        this.props.deleteDriver(this.props.driver.id);
    }

    handleLocate() {
        this.props.locateDriver(this.props.driver.id);
    }

    render() {
        return (
            <div className="driver-container">
                <div className="driver-details">
                    <img src="https://image.flaticon.com/icons/svg/61/61205.svg" alt="Account" />
                    <div>
                        {this.props.driver.name}
                        <div className="age">Age: {this.props.driver.age}</div>
                    </div>
                </div>

                <div className="driver-actions">
                    <span>Tasks: {this.props.tasks.length}</span>
                    <div>
                        <button type="button" className="btn primary" onClick={this.handleLocate}>Location</button>
                        <button type="button" className="btn error" onClick={this.handleRemove}>Remove</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Driver;