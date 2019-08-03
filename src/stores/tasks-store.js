import { computed, observable, action, observe } from 'mobx';
import observableDriversStore from './drivers-store';

class TasksStore {
    @observable tasks = [{
        id: 1,
        title: 'Task #1',
        driverId: 1,
        scheduledFor: '02/08/2019',
        location: {
            latitude: 34,
            longitude: 34
        }
    },
    {
        id: 2,
        title: 'Task #2',
        driverId: 2,
        scheduledFor: '02/08/2019',
        location: {
            latitude: 34,
            longitude: 34
        }
    },
    {
        id: 3,
        title: 'Task #3',
        driverId: 2,
        scheduledFor: '02/08/2019',
        location: {
            latitude: 34,
            longitude: 34
        }
    }];

    @observable tasksMap = new Map();
    @observable driversToTasksMap = new Map();
    @observable filteredIds = [];
    @observable filterActivated = false;

    constructor() {
        this.initTasksList();

        observe(observableDriversStore, 'driverFilter', (change) => {
            this.handleDriversFilterChange();
        });
    }

    @action initTasksList() {
        for (const task of this.tasks) {
            this.addTask(task);
        }
    }

    @action addTask(task) {
        this.tasksMap.set(task.id, task);

        if (!this.driversToTasksMap.has(task.driverId)) {
            this.driversToTasksMap.set(task.driverId, new Map());
        }

        this.driversToTasksMap.get(task.driverId).set(task.id, task);
    }

    @action deleteTask(taskId, driverId) {
        if (this.tasksMap.has(taskId)) {
            this.tasksMap.delete(taskId);
        }

        if (this.driversToTasksMap.has(driverId)) {
            const tasksList = this.driversToTasksMap.get(driverId);

            if (tasksList.has(taskId)) {
                this.tasksList.delete(taskId);
            }
        }
    }

    @action handleDriversFilterChange() {
        this.filterActivated = (observableDriversStore.driverFilter !== '');
        this.filteredIds = observableDriversStore.filteredDrivers.map(driver => driver.id);
    }

    @computed get filteredTasks() {
        if (!this.filterActivated) {
            return Array.from(this.tasksMap.values());
        }

        if (this.filteredIds.length > 0) {
            let result = [];

            for (const id of this.filteredIds) {
                if (this.driversToTasksMap.has(id)) {
                    for (const task of this.driversToTasksMap.get(id).values()) {
                        result.push(task);
                    }
                }
            }

            return result;
        }

        return [];
    }
}

const observableTasksStore = new TasksStore();

export default observableTasksStore;