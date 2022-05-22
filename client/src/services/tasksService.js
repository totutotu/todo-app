import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});

export const getTasks = async () => {
    try {
        const res = await api.get('/');

        if (res.status === 200) {
            return {
                tasks: res.data.tasks,
                error: false,
            };
        } else {
            return {
                error: true,
                message: 'Fetching tasks failed',
            };
        }
    } catch (e) {
        return {
            error: true,
            message: 'Fetching tasks failed',
        };
    }
};

export const changeTaskCompleteStatus = async (task) => {
    try {
        const data = {
            ...task,
            completed: !task.completed,
        };
        const res = await api.put(`/${task.id}`, data);

        if (res.status === 204) {
            return {
                error: false,
            };
        } else {
            return {
                error: true,
                message: `Setting task ${task.description} completed failed`,
            };
        }
    } catch (e) {
        return {
            error: true,
            message: 'asdfasdfasdf tasks failed',
        };
    }
};

export const removeTask = async (taskId) => {
    try {
        const res = await api.delete(`/${taskId}`);

        if (res.status === 204) {
            return {
                error: false,
            };
        } else {
            return {
                error: true,
                message: `Deleting task ${taskId} failed`,
            };
        }
    } catch (e) {
        return {
            error: true,
            message: `Deleting task ${taskId} failed`,
        };
    }
};

export const createTask = async (description) => {
    try {
        const data = {
            description,
        };
        const res = await api.post('/', data);

        if (res.status === 201) {
            return {
                task: res.data,
                error: false,
            };
        } else {
            return {
                error: true,
                message: `Creating a new task ${description} failed`,
            };
        }
    } catch (e) {
        return {
            error: true,
            message: `Creating a new task ${description} failed`,
        };
    }
};
