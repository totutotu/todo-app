import { DataSource } from 'typeorm';
import Task from './models/Task';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'test') {
    dotenv.config({ path: './.env.test' });
} else if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

export const dataBaseConnection = new DataSource({
    type: 'sqlite',
    database: process.env.DB_LOCATION,
    entities: [Task],
    synchronize: true,
});

export const connectToDb = async () => {
    try {
        await dataBaseConnection.initialize();
        console.log('connected to db!');
    } catch (e: unknown) {
        console.log('Error connecting to database: ', e);
        console.log('Exiting');
        process.exit(1);
    }
};


