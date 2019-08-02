import { decorate, computed, action, observable, observe } from 'mobx';
import observableDriversStore from './drivers-store';

class TasksStore {
    tasks = [{
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

    driversToTasksMap = new Map();
    filteredIds = [];
    filterActivated = false;

    constructor() {
        this.mapTasksList();

        // setTimeout(() => {
        //     this.addTask({
        //         id: 4,
        //         title: 'Task #4',
        //         driverId: 2,
        //         location: {
        //             latitude: 34,
        //             longitude: 34
        //         }
        //     });
        // }, 1000);

        // setTimeout(() => {
        //     this.deleteTask(4);
        // }, 4000);

        observe(observableDriversStore, 'driverFilter', (change) => {
            this.filterActivated = (observableDriversStore.driverFilter !== '');
            this.filteredIds = observableDriversStore.filteredDrivers.map(driver => driver.id);
        });
    }

    mapTasksList() {
        for (const task of this.tasks) {
            this.insertTaskToMap(task);
        }
    }

    addTask(task) {
        this.tasks.push(task);
        this.insertTaskToMap(task);
    }

    deleteTask(taskId) {
        const index = this.tasks.findIndex((task) => task.id === taskId);

        if (index !== -1) {
            const driverId = this.tasks[index].driverId;

            this.tasks.splice(index, 1);

            if (this.driversToTasksMap.has(driverId)) {
                const innerIndex = this.driversToTasksMap.get(driverId).findIndex((task) => task.id === taskId);

                if (innerIndex !== -1) {
                    this.driversToTasksMap.get(driverId).splice(innerIndex, 1);

                    if (!this.driversToTasksMap.get(driverId).length) {
                        this.driversToTasksMap.remove(driverId);
                    }
                }
            }
        }
    }

    insertTaskToMap(task) {
        if (!this.driversToTasksMap.has(task.driverId)) {
            this.driversToTasksMap.set(task.driverId, []);
        }

        this.driversToTasksMap.get(task.driverId).push(task);
    }

    get filteredTasks() {
        if (!this.filterActivated) {
            return this.tasks;
        }

        if (this.filteredIds.length > 0) {
            let result = [];

            for (const id of this.filteredIds) {
                if (this.driversToTasksMap.has(id)) {
                    for (const task of this.driversToTasksMap.get(id)) {
                        result.push(task);
                    }
                }
            }

            return result;
        }

        return [];
    }
}

decorate(TasksStore, {
    tasks: observable,
    driversToTasksMap: observable,
    filteredIds: observable,
    filterActivated: observable,
    filteredTasks: computed,
    addTask: action,
    deleteTask: action,
    insertTaskToMap: action
});

const observableTasksStore = new TasksStore();

export default observableTasksStore;