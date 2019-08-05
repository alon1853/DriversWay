import { configure, computed, observable, runInAction, action, values } from 'mobx';

configure({ enforceActions: 'observed' });

class ObservableDriversStore {
    @observable drivers = [];
    @observable driversMap = new Map();
    @observable driverFilter = '';

    constructor() {
        this.fetchDrivers();
    }

    @action initDriversMap() {
        for (const driver of this.drivers) {
            this.addDriver(driver);
        }
    }

    @action fetchDrivers() {
        this.drivers = [];

        fetch('http://my-json-server.typicode.com/alon1853/DriversWay/drivers').then(
            (response) => {
                response.json().then(
                    (drivers) => {
                        runInAction(() => {
                            this.drivers = drivers;
                            this.drivers.push(
                                {
                                    "id": 3,
                                    "name": "Foo Bar",
                                    "age": 30,
                                    "location": {
                                        "latitude": -0.095,
                                        "longitude": 51.5055
                                    },
                                    "picture": "",
                                    "phone": "+972521234567"
                                },
                                {
                                    "id": 4,
                                    "name": "Foo2 Bar2",
                                    "age": 30,
                                    "location": {
                                        "latitude": 33,
                                        "longitude": 33
                                    },
                                    "picture": "",
                                    "phone": "+972521234567"
                                }
                            );
                        });

                        this.initDriversMap();
                    }
                );
            },
            (error) => {
                console.error(error);
            }
        )
    }

    @computed get filteredDrivers() {
        const drivers = values(this.driversMap);

        if (this.driverFilter) {
            return drivers.filter(
                (driver) => driver.name.toLowerCase().includes(this.driverFilter.toLowerCase())
            );
        }

        return drivers;
    }

    @action addDriver(driver) {
        this.driversMap.set(driver.id, driver);
    }

    @action deleteDriver(driverId) {
        if (this.driversMap.has(driverId)) {
            this.driversMap.delete(driverId);
        }
    }

    @action setDriverFilter(filter) {
        this.driverFilter = filter;
    }
}

const observableDriversStore = new ObservableDriversStore();

export default observableDriversStore;