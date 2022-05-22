import express, { Request, Response} from 'express';
import * as TasksController from '../controllers/tasksController';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
    return TasksController.createTask(req, res);
});

router.get('/', (req: Request, res: Response) => {
    return TasksController.getTasks(req, res);
});

router.put('/:id', (req: Request, res: Response) => {
    return TasksController.updateTask(req, res);
});

router.delete('/:id', (req: Request, res: Response) => {
    return TasksController.deleteTask(req, res);
});

export default router;
