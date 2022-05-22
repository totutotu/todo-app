import { dataBaseConnection } from '../data-source';
import Task from '../models/Task';

const taskRepository = dataBaseConnection.getRepository(Task);

const create = async (description: string) => {
    const task = new Task();
    task.description = description;

    const res = await taskRepository.save(task);

    return res;
};

const get = async () => {
    const res = await taskRepository.find();

    return res;
};

const update = async (id: number, description: string, completed: boolean) => {
    return await taskRepository.update(id, {id, description, completed });
};

const remove = async (id: number) => {
    return await taskRepository.delete({ id });
};


export {
    create,
    get,
    update,
    remove,
};
