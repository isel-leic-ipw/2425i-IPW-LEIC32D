import express from 'express';

const PORT = 8000;  // Port number for the tests
const app = express(); // Express function returns an app

const TASKS = [];
let currentId = TASKS.length;

app.use(express.json());

// get task by id
app.get("/tasks/:id", getTask);

// list tasks
app.get("/tasks", getAllTasks);

// add task
app.post("/tasks", addTask);

// delete task by id
app.delete("/tasks/:id", deleteTask);

// update task by id
app.put("/tasks/:id", updateTask);

// App listening...
app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`),
);


// FUNCTIONS:

function getTask(req, res){
    console.log(req.params.id);
    let task = TASKS.find(task => task.id == req.params.id);
    if (task)
      res.send(task);
    else
      res.status(404).end();
}

function getAllTasks(req, res){
  res.set("Content-Type", "application/json");
  res.send(JSON.stringify(TASKS));
  //res.json(tasks);
}

function addTask(req, res){
  //console.log(req.body);
  let task = {
    id: currentId,
    title: req.body.title,
    description: req.body.description
  }
  TASKS.push(task);
  currentId++;
  res.status(201);
  res.send(`Task id ${task.id} was added!`);
}

function deleteTask(req, res){
  let taskIndex = TASKS.findIndex(task => task.id == req.params.id);
  if (taskIndex != -1){
    let task = TASKS[taskIndex];
    // Usage: array.splice(startIndex, deleteCount)
    TASKS.splice(taskIndex, 1);
    res.json(task).end();
  }
  else{
    res.status(404).end();
  }
}

function updateTask(req, res){
  let taskIndex = TASKS.findIndex(task => task.id == req.params.id);
  if (taskIndex != -1){
    TASKS[taskIndex].title = req.body.title;
    TASKS[taskIndex].description = req.body.description;
    res.json(TASKS[taskIndex]).end();
  }
  else{
    res.status(404).end();
  }
}

// Testing: use the Rest Client in VScode or Postman to make the following request
