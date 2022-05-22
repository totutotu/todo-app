# TODO-app

This todo-app consists of a simple Node + TS + express API that uses sqlite for data storage and a React client fueled by create-react-app.

## Development

To run this app you need to have two separate terminals running 

### Api

Navigate to the `api` folder, install the depencies through `npm` and start the server dev environment with the command `npm run dev`.

The api runs by default in the port `8000` and the sqlite database file is created to path `api/test.sql`. These can be changed from the .env file, but any changes are not required. 

Commands:

```
cd ./api
npm install
npm run dev
```

### Client

Navigate to the `client` folder, install the depencies through `npm` and start the client dev environment with the command `npm start`.

The client runs by default in the port `3000`.

The api url is set ready within the `.env` file. If not using the default 8000 port, change the address there.

Commands:

```
cd ./server
npm install
npm start
```

After these the app should be running in http://localhost:3000 .

## Tests/QA

### API

The api uses `jest` and `supertest` for testing all the endpoints it offers. Testing uses a separate port `8001` and db file `api/data/test.sql`. These can be changed if needed from the `api/.env.test` file.

To run the tests make sure you have the dependencies installed and run:

```
npm test
```

The api also uses `eslint` for code quality management. Linting can be run with:

```
npm run lint
```

### Client

The client uses `react-testing-library` for minimal testing.

To run the tests make sure you have the dependencies installed and run:

```
npm test
```

The client also uses `eslint` for code quality management. Linting can be run with:

```
npm run lint
```
