import { configure, computed, observable, runInAction, action, observe, values } from 'mobx';
import observableDriversStore from './drivers-store';

configure({ enforceActions: 'observed' });

class TasksStore {
    @observable tasks = [];
    @observable tasksMap = new Map();
    @observable driversToTasksMap = new Map();
    @observable filteredIds = [];
    @observable filterActivated = false;

    constructor() {
        this.fetchTasks();

        observe(observableDriversStore, 'driverFilter', (change) => {
            this.handleDriversFilterChange();
        });

        observe(observableDriversStore.driversMap, (change) => {
            this.updateDriverInMap(change);
        });
    }

    @action initTasksList() {
        for (const task of this.tasks) {
            this.addTask(task);
        }
    }

    @action fetchTasks() {
        this.tasks = [];

        fetch('http://my-json-server.typicode.com/alon1853/DriversWay/tasks').then(
            (response) => {
                response.json().then(
                    (tasks) => {
                        runInAction(() => {
                            this.tasks = tasks;
                            this.tasks.push(
                                {
                                    "id": 4,
                                    "title": "Task #4",
                                    "driverId": undefined,
                                    "scheduledFor": "02/08/2019",
                                    "location": {
                                        "latitude": -0.090,
                                        "longitude": 51.5050
                                    }
                                },
                                {
                                    "id": 5,
                                    "title": "Task #5",
                                    "driverId": undefined,
                                    "scheduledFor": "02/08/2019",
                                    "location": {
                                        "latitude": 34,
                                        "longitude": 34
                                    }
                                }
                            );
                        });

                        this.initTasksList();
                    }
                );
            },
            (error) => {
                console.error(error);
            }
        )
    }

    @action updateDriverInMap(change) {
        switch (change.type) {
            case 'add': {
                this.addDriverToMap(change.newValue.id);

                break;
            }

            case 'delete': {
                this.deleteDriverFromMap(change.oldValue.id);

                break;
            }

            default: {
                break;
            }
        }
    }

    @action addDriverToMap(driverId) {
        if (!this.driversToTasksMap.has(driverId)) {
            this.driversToTasksMap.set(driverId, new Map());
        }
    }

    @action deleteDriverFromMap(driverId) {
        if (this.driversToTasksMap.has(driverId)) {
            this.driversToTasksMap.delete(driverId);
        }
    }

    @action addTask(task) {
        this.tasksMap.set(task.id, task);
        this.addDriverToMap(task.driverId);
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

    @action assignTaskToDriver(taskId, driverId) {
        let oldDriverId;
        const newDriverId = (Number.isNaN(driverId) ? undefined : driverId);

        // Assign task to new driver
        if (this.tasksMap.has(taskId)) {
            oldDriverId = this.tasksMap.get(taskId).driverId;
            this.tasksMap.set(taskId, { ...this.tasksMap.get(taskId), driverId: newDriverId });
        }

        // Unassign task from old driver (if there is)
        if (oldDriverId !== undefined && this.driversToTasksMap.has(oldDriverId)) {
            this.driversToTasksMap.get(oldDriverId).delete(taskId);
        }

        // Update new driver's task in drivers to tasks map
        if (newDriverId !== null && this.driversToTasksMap.has(driverId)) {
            this.driversToTasksMap.get(driverId).set(taskId, this.tasksMap.get(taskId));
        }
    }

    @computed get filteredTasks() {
        if (!this.filterActivated) {
            return values(this.tasksMap);
        }

        if (this.filteredIds.length > 0) {
            let filteredTasks = [];

            for (const id of this.filteredIds) {
                if (this.driversToTasksMap.has(id)) {
                    filteredTasks = filteredTasks.concat(values(this.driversToTasksMap.get(id)));
                }
            }

            return filteredTasks;
        }

        return [];
    }
}

const observableTasksStore = new TasksStore();

export default observableTasksStore;