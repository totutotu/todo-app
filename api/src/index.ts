import http from 'http';
import { app } from './app';
import { connectToDb } from './data-source';

const startServer = async () => {
    await connectToDb();
    const port = process.env.PORT ?? 8000;

    http.createServer(app).listen(port);
};

startServer();
