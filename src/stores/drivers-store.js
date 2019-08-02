import { decorate, observable } from 'mobx';

class ObservableDriversStore {
    drivers = [{
        id: 1,
        name: 'Alex'
    },
    {
        id: 2,
        name: 'Alon'
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