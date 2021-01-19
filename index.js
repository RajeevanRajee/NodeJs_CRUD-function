const express = require('express');
const pool = require('./db');
const app = express();
const db = require('./db');
const port = 5000;

app.use(express.json());

/*
app.post("/todo", async (req, res) => {
  console.log("dfdfdsfsfdfdsf");
  try{
      console.log("Request"+req.body.description);
    const {description} = req.body.description;
     const newTodo =await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING todo_id",
        [description]
    );
res.json(newTodo);
}catch(err){
    console.error(err.message);
}

});*/


app.post("/todo", async (req, res) => {
    
    try{
        const {description} = req.body;
        const newTodo =await pool.query(
            "INSERT INTO todo (description) VALUES ($1) RETURNING todo_id",
            [description]
        );
    res.json(newTodo);
    }catch(err){
        console.error(err.message);
    }
    });


    app.get("/todo",async (req,res) => {
        try{
            const allTodos = await pool.query('select * from todo');
            res.json(allTodos.rows);
        }
        catch(err){
            console.error(err.message);
        }
    });



    app.put("/todo/:id", async (req, res) => {
    
        try{
            const {id} = req.params;
            const {description} = req.body;
            const updateTodo =await pool.query(
                "UPDATE todo SET description = $1 WHERE todo_id = $2",
                [description,id]
            );
        res.json("Todo was updated");
        }catch(err){
            console.error(err.message);
        }
        });
        app.delete("/todo/:id", async (req, res) => {
    
            try{
                const {id} = req.params;
                const deleteTudo =await pool.query(
                    "DELETE FROM todo WHERE todo_id = $1",
                    [id]
                );
            res.json("Todo was deleted");
            }catch(err){
                console.error(err.message);
            }
            });


app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))