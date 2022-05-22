import { app } from 'app';
import request from 'supertest';

describe('GET /ping', () => {
    it('returns status code 200', async () => {
        const res = await request(app)
            .get('/ping')
            .send();
        expect(res.statusCode).toEqual(200);
    });

    it('returns text pong', async () => {
        const res = await request(app)
            .get('/ping')
            .send();
        expect(res.text).toEqual('pong');
    });
});
