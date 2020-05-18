var express = require('express');
var cors = require('cors');
var app = express();


var mongoClient =require("mongodb").MongoClient;


mongoClient.connect('mongodb://127.0.0.1:27017/demo', function (err, db) {
    //neu ket noi khong thanh cong thi in ra loi
    if (err) throw err;
    //neu thanh cong thi log ra thong bao
    console.log('Ket noi thanh cong');
    db.close();
    console.log('close thanh cong');
});

app.use(cors());

app.use(express.json());
app.listen( process.env.PORT || 8081, () => {
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
        name: 'Task 4'
    },
    {
        id: 5,
        name: 'Task5'
    }
];




app.get("/todos",  (req, res, next) => {
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


// them todo voi id tu sinh ra theo date, time 

app.post("/todos", (req, res, next) => {
    const todo = {
        id: (new Date()).getTime(),
        name: req.body.name
    };
    todos.push(todo);
    res.json(todo);
});

// xoa todo bang id
app.delete("/todos/:id", (req, res, next) => {
    const id = +req.params.id;
    const index = findToDoIndex(id);
    if(index !== -1) {
        todos.splice(index, 1);
        res.json({message: 'Todos deleted', id: id});
    } else {
        res.status(404).json({message: 'Not found'});
    }
});


// update todo

app.put("/todos/:id", (req, res, next) => {
    const id = +req.params.id;
    const index = findToDoIndex(id);
    if(index !== -1) {
        const todo = todos[index];
        todo.name = req.body.name;
        res.json(todo);
    } else {
        res.status(404).json({message: 'Not found'});
    }
});


// tim kiem record todo
function findToDoIndex(id) {
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
            return i;
        }
    }
    return -1;
}