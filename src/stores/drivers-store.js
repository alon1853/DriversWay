import { configure, computed, observable, runInAction, action, values } from 'mobx';

configure({ enforceActions: 'observed' });

class ObservableDriversStore {
    @observable drivers = [];
    @observable driversMap = new Map();
    @observable driverFilter = '';
    @observable sortBy = '';
    @observable sortAscending = true;

    constructor() {
        this.fetchDrivers();
        this.setSortByAge();
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

        switch (this.sortBy) {
            case 'age': {
                drivers.sort(this.sortByAge.bind(this));
                break;
            }
            case 'name':
            default: {
                drivers.sort(this.sortByName.bind(this));
                break;
            }
        }

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

    @action toggleSortDirection() {
        this.sortAscending = !this.sortAscending;
    }

    @action setSortByName() {
        this.sortBy = 'name';
    }

    @action setSortByAge() {
        this.sortBy = 'age';
    }

    sortByName(driverA, driverB) {
        const nameA = driverA.name.toUpperCase();
        const nameB = driverB.name.toUpperCase();

        if (nameA < nameB) {
            if (this.sortAscending) {
                return -1;
            }

            return 1;
        }
        if (nameA > nameB) {

            if (this.sortAscending) {
                return 1;
            }
            return -1;
        }

        return 0;
    }

    sortByAge(driverA, driverB) {
        const result = driverA.age - driverB.age;

        if (!this.sortAscending) {
            return result * -1;
        }

        return result;
    }
}

const observableDriversStore = new ObservableDriversStore();

export default observableDriversStore;