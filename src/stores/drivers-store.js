import { computed, observable } from 'mobx';

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

    @observable driverFilter = '';

    @computed get filteredDrivers() {
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

const observableDriversStore = new ObservableDriversStore();

export default observableDriversStore;