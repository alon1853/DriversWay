import { computed, observable, action, values } from 'mobx';

class ObservableDriversStore {
    @observable drivers = [{
        id: 1,
        name: 'Hello World',
        age: 30,
        location: {
            latitude: 33,
            longitude: 33
        },
        picture: '',
        phone: '+972521234567'
    },
    {
        id: 2,
        name: 'Alon Yosef',
        age: 24,
        location: {
            latitude: 33,
            longitude: 33
        },
        picture: '',
        phone: '+972521234567'
    }];

    @observable driversMap = new Map();
    @observable driverFilter = '';

    constructor() {
        this.initDriversMap();
    }

    @action initDriversMap() {
        for (const driver of this.drivers) {
            this.addDriver(driver);
        }
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