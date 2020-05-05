const express = require("express");
const app = express();
app.use(express.json());
app.listen(8081, () => {
    console.log("Serve running on port 8081 ");
});


const todos = [
    {
        id: 1,
        name: 'Task 1'

    },
    {
        id: 2,
        name: 'Task2'
    },
    {
        id: 3,
        name: ' Task 3'
    },
    {
        id: 4,
        name: 'Task4'
    },
    {
        id: 5,
        name: 'Task5'
    }
];


function findToDoIndex(id) {
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
            return i;
        }
    }
    return -1;
}

app.get("/todos", (req, res, next) => {
    res.json(todos);
});

app.get("/todos/:id", (req, res, next) => {
    const id = +req.params.id;
    const index = findToDoIndex(id);

    if (index !== -1) {
        res.json(todos[index])
    } else {
        res.status(404).json({message: "Not found"});
    }
});


// them todo voi id tu sinh ra

app.post("/todos", (req, res, next) => {
    const todo = {
        id: (new Date()).getTime(),
        name: req.body.name
    };
    todos.push(todo);
    res.json(todo);
});

// xoa todo bang id
app.delete("/todos/:id", (req, res, next ) => {
   const  id = +res.params.id;
   const index = findToDoIndex(id);
   if (index !== -1){
       todos.splice(index, 1);
       res.json({message: 'succeed'})
   } else {
       res.status(404).json({message: 'Not found'})
   }
});

// update todo

app.put("todos/:id", (req, res, next) => {
    const id = +req.params.id;
    const index = findToDoIndex(id);
    if (index !== -1) {
        const todo = todos[index];
        todo.name;
        res.json(todo);
    } else {
        res.status(404).json({message: " Not found "})
    }
});

