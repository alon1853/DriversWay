import { decorate, observable } from 'mobx';

class TasksStore {
    tasks = [{
        id: 1,
        title: 'Task #1',
        driverId: 1,
        location: {
            latitude: 34,
            longitude: 34
        }
    },
    {
        id: 2,
        title: 'Task #2',
        driverId: 2,
        location: {
            latitude: 34,
            longitude: 34
        }
    }];
}

decorate(TasksStore, {
    tasks: observable
});

const observableTasksStore = new TasksStore();

export default observableTasksStore;