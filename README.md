
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript with PostgreSQL database for a to do list.

## Preparation
The application requires that node and npm are installed beforehand. Also you will need a local setup of postgres database.

Node version: ```14.19.2```

Postgres version: ```14.5```

## Environment

Environment setup is as easy as it comes. There is already a ```.env.example``` file inside the repository. First step would be to copy that file to another named ```.env```.
```
PORT= Port that the app runs on, suggested to leave 3000
POSTGRES_HOST= Host url of the postgres database
POSTGRES_PORT= Port of the postgres database
POSTGRES_USER= Corresponding user for the postgres database
POSTGRES_PASSWORD= Password for the user for the postgres database
POSTGRES_DB= Database name where your app data resides in postgres
JWT_SECRET= Your jwt secret
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## App endpoints and how to use them

### POST ```/user/register```

This route is the starting point. It will register your user allowing you to login and get a Bearer token for the other endpoints
```
Example Request Body:
{
    "name": "Nina",
    "email": "ninakelmendi@gmail.com,
    "password": "VerySecurePassw0rd!",
}
```
### POST ```/user/login```

Here you register with your user and get a bearer token as a response where you have to use it for all other routes
```
Example Request Body:
{
    "email": "ninakelmendi@gmail.com,
    "password": "VerySecurePassw0rd!",
}
```

### POST ```/task/all```

Here you can retrieve all your created tasks

### POST ```/task/all/:status```

Here you can retrieve all your created tasks filtered by status. The status is one of 3 states find in the Status enum in the enums folder

### POST ```/task/create```

Here you can create tasks
```
Example Request Body:
{
    "name": "Clean the house,
    "description": "Don't forget to make your bed !,
    "status": "Status.ToDo",
}
```

### POST ```/task/update/:id```

Here you can update a certain task using the id parameter 
```
Example Request Body:
{
    "name": "Clean the house,
    "description": "Don't forget to make your bed !,
    "status": "Status.ToDo",
}
```

### POST ```/task/delete/:id```

Here you can delete a certain task using the id parameter 

### POST ```/task/averageCompletedTasks/```

Here you get the avarage of all completed tasks relative to total tasks.
