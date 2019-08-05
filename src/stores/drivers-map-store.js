import { observable, action } from 'mobx';

class DriversMapStore {
    @observable mapCenter = [];
    @observable displayedTasks = new Map();

    constructor() {
        this.initMapCenter();
    }

    @action initMapCenter() {
        this.setMapCenter([51.505, -0.09]);
    }

    @action setMapCenter(center) {
        this.mapCenter = center;
    }

    @action toggleDisplayTask(taskId) {
        if (this.displayedTasks.has(taskId)) {
            this.displayedTasks.delete(taskId);
        } else {
            this.displayedTasks.set(taskId, true);
        }
    }
}

const observableDriversMapStore = new DriversMapStore();

export default observableDriversMapStore;