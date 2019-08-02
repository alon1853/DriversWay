import { decorate, observable } from 'mobx';

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
        phone: '+972521234567',
        tasks: []
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
        phone: '+972521234567',
        tasks: []
    }];

    addDriver(driver) {
        this.drivers.push(driver);
    }
}

decorate(ObservableDriversStore, {
    drivers: observable
});

const observableDriversStore = new ObservableDriversStore();

export default observableDriversStore;