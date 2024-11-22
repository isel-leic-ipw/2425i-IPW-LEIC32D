import express from 'express';
import * as tasksAPI from './web/api/tasks-web-api.mjs';
import * as usersAPI from './web/api/users-web-api.mjs';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import cors from 'cors';

const PORT = 8000;  // Port number for the tests
const app = express(); // Express function returns an app
const swaggerDocument = yaml.load('./docs/tasks-api.yaml');

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Enable all CORS requests
app.use(cors());

// Parser the body to JSON
app.use(express.json());

// Authorize a user by a given token
app.use("/tasks*", tasksAPI.ensureToken);

// add user
app.post("/users", usersAPI.addUser);

// get task by id
app.get("/tasks/:taskId", tasksAPI.getTask);

// list tasks
app.get("/tasks", tasksAPI.getAllTasks);

// add task
app.post("/tasks", tasksAPI.addTask);

// delete task by id
app.delete("/tasks/:taskId?", tasksAPI.deleteTask);

// update task by id
app.put("/tasks/:taskId?", tasksAPI.updateTask);

app.use(tasksAPI.handlerError);

// App listening...
app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`),
);

// Testing: use the Rest Client in VScode or Postman to make the following request
