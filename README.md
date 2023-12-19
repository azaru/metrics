## Codetest

### How to run

MySQL is used as the database, so you need to install MySQL first.

After clone the repo

backend/.env file is used to configure the database connection, you can change the value of the following variables to connect to your database
there are a example file called .env.example

Node 18 is the version used to develop this project.

first you need to create the database and seed it

```bash
cd backend
npm install
npm run seed
```

then run the following commands to start the backend server

```bash
cd backend
npm install
npm run offline
```

then run the following commands to start the frontend server

```bash
cd frontend
npm install
npm start
```


### How to test

```bash
cd backend
npm run test
```

```bash
cd frontend
npm run test
```

### How to deploy

I made a deployment for AWS but is not working
it's at iac folder
Anyway, it's a very simple deployment, not taking into account security. In a complete deployment, it will be necessary at least a WAF, secret manager, and security groups, as well as it is advisable to use Cognito.