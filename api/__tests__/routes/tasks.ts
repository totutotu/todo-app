import dotenv from 'dotenv';
import request from 'supertest';
import { MoreThan, Repository } from 'typeorm';

import { app } from 'app';
import { connectToDb, dataBaseConnection } from 'data-source';
import Task from 'models/Task';


dotenv.config({ path: './__tests__/.env'});

describe('API tests', () => {
    let taskRepository: Repository<Task>;
    beforeAll(async () => {
        await connectToDb();
        taskRepository = dataBaseConnection.getRepository(Task);
    });

    afterAll(() => {
        return taskRepository.delete({ id: MoreThan(0) });
    });

    describe('POST /api/tasks', () => {
        it('returns status code 201 when a task creation succeeds', async () => {
            const body = {
                description: 'Feed the kittens',
            };
            const res = await request(app)
                .post('/api/tasks')
                .send(body)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.statusCode).toEqual(201);
        });

        it('returns the newly created task', async () => {
            const description = 'Do something sensible';
            const body = {
                description,
            };
            const res = await request(app)
                .post('/api/tasks')
                .send(body)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.body).toHaveProperty('description');
            expect(res.body).toHaveProperty('completed');
            expect(res.body).toHaveProperty('createdTimeStamp');
            expect(res.body).toHaveProperty('id');

            expect(res.body.description).toEqual(description);
        });

        it('returns status code 401 when attempting create a task with an empty body', async () => {
            const body = {};
            const res = await request(app)
                .post('/api/tasks')
                .send(body)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.statusCode).toEqual(400);
        });

        it('returns status code 401 when attempting create a task with a too long description', async () => {
            const body = {
                description: `
                    asdfasdfafsddafsafsdfads
                    asdfasdffasdfadsdfsa
                    afsdadfsafsddsfafadsadfs
                    afsddfsaadsffdsaadsfafds
                    adsfadsfasdfadfsdsafasfd
                `,
            };
            const res = await request(app)
                .post('/api/tasks')
                .send(body)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');

            expect(res.statusCode).toEqual(400);
            expect(res.body.error).toEqual('Task description length limit exceeded');
        });
    });

    describe('GET /api/tasks', () => {
        const description1 = 'Do todo-app';
        const description2 = 'Do testing';
        const description3 = 'Do frontend';

        beforeEach(async () => {
            await taskRepository.delete({ id: MoreThan(0) });

            const task1 = new Task();
            task1.description = description1;
            const task2 = new Task();
            task2.description = description2;
            const task3 = new Task();
            task3.description = description3;

            await taskRepository.save([task1, task2, task3]);

        });
        it('returns all tasks in the db', async () => {
            const res = await request(app)
                .get('/api/tasks');
            expect(res.statusCode).toEqual(200);
            expect(res.body.tasks.length).toEqual(3);
        });
    });

    describe('PUT /api/tasks/:id', () => {
        const description = 'Complete this soon';
        let taskToBeUpdated: Task;

        beforeEach(async () => {
            await taskRepository.delete({ id: MoreThan(0) });
            const task = new Task();
            task.description = description;
            taskToBeUpdated = await taskRepository.save(task);
        });
        it('updates sent task', async () => {
            const data = {
                ...taskToBeUpdated,
                completed: true,
            };

            const res = await request(app)
                .put(`/api/tasks/${taskToBeUpdated.id}`)
                .send(data);
            expect(res.statusCode).toEqual(204);

            const updatedTask = await taskRepository.findOne({ where: {id: taskToBeUpdated.id }});
            expect(updatedTask.completed).toEqual(true);

        });
    });

    describe('DELETE /api/tasks/:id', () => {
        const description = 'Delete this soon';
        let taskToBeDeleted: Task;

        beforeEach(async () => {
            const task = new Task();
            task.description = description;
            taskToBeDeleted = await taskRepository.save(task);
        });
        it('updates sent task', async () => {
            const res = await request(app)
                .delete(`/api/tasks/${taskToBeDeleted.id}`);
            expect(res.statusCode).toEqual(204);

            const deletedTask = await taskRepository.findOne({ where: {id: taskToBeDeleted.id }});
            expect(deletedTask).toBeFalsy();

        });
    });
});
