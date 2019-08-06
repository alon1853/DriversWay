import { configure, computed, observable, runInAction, action, values } from 'mobx';

configure({ enforceActions: 'observed' });

export const NAME = 'name';
export const AGE = 'age';

class ObservableDriversStore {
    @observable drivers = [];
    @observable driversMap = new Map();
    @observable driverFilter = '';
    @observable sortBy = '';
    @observable sortAscending;

    constructor() {
        this.fetchDrivers();
        this.initSortDirection();
        this.setSortByName();
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
            case AGE: {
                drivers.sort(this.sortByAge.bind(this));
                break;
            }
            case NAME:
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
        this.sortAscending *= -1;
    }

    @action initSortDirection() {
        this.sortAscending = 1;
    }

    @action setSortByName() {
        if (this.sortBy !== NAME) {
            this.sortBy = NAME;
            this.initSortDirection();
        } else {
            this.toogleSortOrder();
        }
    }

    @action setSortByAge() {
        if (this.sortBy !== AGE) {
            this.sortBy = AGE;
            this.initSortDirection();
        } else {
            this.toogleSortOrder();
        }
    }

    @action toogleSortOrder() {
        this.sortAscending *= -1;
    }

    sortByName(driverA, driverB) {
        const nameA = driverA.name.toUpperCase();
        const nameB = driverB.name.toUpperCase();

        if (nameA < nameB) {
            return -1 * this.sortAscending;
        }
        if (nameA > nameB) {
            return 1 * this.sortAscending;
        }

        return 0;
    }

    sortByAge(driverA, driverB) {
        return (driverA.age - driverB.age) * this.sortAscending;
    }
}

const observableDriversStore = new ObservableDriversStore();

export default observableDriversStore;