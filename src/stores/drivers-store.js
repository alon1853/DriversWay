import { decorate, computed, action, observable } from 'mobx';

class ObservableDriversStore {
    drivers = [{
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

    driverFilter = '';

    get filteredDrivers() {
        if (this.driverFilter) {
            return this.drivers.filter(
                (driver) => driver.name.toLowerCase().includes(this.driverFilter.toLowerCase())
            );
        }

        return this.drivers;
    }

    addDriver(driver) {
        this.drivers.push(driver);
    }

    deleteDriver(driverId) {
        const index = this.drivers.findIndex((driver) => driver.id === driverId);

        if (index !== -1) {
            this.drivers.splice(index, 1);
        }
    }

    setDriverFilter(filter) {
        this.driverFilter = filter;
    }
}

decorate(ObservableDriversStore, {
    drivers: observable,
    driverFilter: observable,
    filteredDrivers: computed,
    addDriver: action,
    deleteDriver: action,
    setDriverFilter: action
});

const observableDriversStore = new ObservableDriversStore();

export default observableDriversStore;