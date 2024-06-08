import express from "express";

import cors from 'cors';

const app = express();

let id = 1;

const port = 3300;

const REACT_APP_PORT = 3000;

let todos = [{
    id: "abcd",
    content: "abcd"
}];

app.use(
    cors({
        origin: "http://localhost:" + REACT_APP_PORT,
        methods: "GET,POST,PUT,DELETE,PATCH",
        allowedHeaders: "*",
    })
);

app.use(express.json());

app.get("/todos", (req, res) => {
    res.json(todos)
});

app.post("/todos",(req, res)=>{
    //console.log(req.body);
    todos.push({content: req.body.content, id: id+""});
    id++;
});

app.delete("/todos/:id",(req,res)=>{
    const id = req.params.id;
    todos = todos.filter((item)=>{
        return item.id!==id
    });
});

app.patch("/todos/:id",(req,res)=>{
    const id = req.params.id;
    const content = req.body.content;
    todos = todos.map((item)=>{
        if(item.id === id){
            return {content: content, id: id};
        }else{
            return item;
        }
    })
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});