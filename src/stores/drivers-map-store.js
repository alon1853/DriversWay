import { observable, action } from 'mobx';

class DriversMapStore {
    @observable mapCenter = [];

    constructor() {
        this.initMapCenter();
    }

    @action initMapCenter() {
        this.setMapCenter([51.505, -0.09]);
    }

    @action setMapCenter(center) {
        this.mapCenter = center;
    }
}

const observableDriversMapStore = new DriversMapStore();

export default observableDriversMapStore;