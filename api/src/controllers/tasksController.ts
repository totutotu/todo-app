import { Request, Response } from 'express';
import * as tasksService from '../services/tasksService';


const createTask = async ( req: Request, res: Response) => {
    if(!req.body.description) return res.status(400).send({ error: 'Missing task description!' });
    if(req.body.description.length > 100) return res.status(400).send({ error: 'Task description length limit exceeded' });

    try {
        const createdTask = await tasksService.create(req.body.description);

        return res.status(201).send(createdTask);
    } catch (e) {
        return res.status(500).send(e);
    }
};

const deleteTask = async ( req: Request, res: Response) => {
    if(!req.params.id || !Number(req.params.id)) return res.status(400).send({ error: 'Missing or nonnumerical parameter!' });
    try {
        await tasksService.remove(Number(req.params.id));
        return res.sendStatus(204);
    } catch (e) {
        return res.status(500).send(e);
    }
};

const getTasks = async ( req: Request, res: Response) => {
    try {
        const tasks = await tasksService.get();
        return res.status(200).send({ tasks: tasks });
    } catch (e) {
        return res.status(500).send({ error: e });
    }
};

const updateTask = async ( req: Request, res: Response) => {
    if(!req.body.description ||
        typeof req.body.completed === 'undefined' ||
        !req.body.id
    ) return res.status(400).send({ error: 'Missing required fields!' });
    try {
        await tasksService.update(req.body.id, req.body.description, req.body.completed);
        return res.sendStatus(204);
    } catch (e) {
        return res.status(500).send(e);
    }
};



export {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
};
