const express = require('express');
const connection = require('../database/connection');
const { todo } = require('node:test');
const router = express.Router();


    //retrieve list of todos
router.get('/api/v1/todos', (req, res)=>{
    connection.query('select * from todo_app', (err, results)=>{
        if(err) {
            res.status(500).send({message: 'Error retrieving from todo_app table'});
        } else{
            res.json(results);
        }
            
    });
});

    //create a new todo
router.post('/api/v1/todos', (req, res)=>{
    const {title, description, start_date, due_date, complete} = req.body;
    connection.query('INSERT INTO todo_app (title, description, start_date, due_date, complete) values (?, ?, ?, ?, ?)', [title, description, start_date, due_date, complete], (err, results)=>{
        if(err) {
            res.status(500).send({message: 'Error creating new todo'});
        } else{
            res.json({message: 'New todo created successfully'});
        }
    });
});

//fetch a single item
router.get('/api/v1/todos/:id', (req, res)=>{
    const {id} = req.params;
    connection.query('SELECT * FROM todo_app WHERE id =?', [id], (err, results)=>{
        if(err) {
            res.status(500).send({message: 'Error retrieving from todo_app table'});
        } else{
            if(results.length > 0){
                res.json(results[0]);
            } else{
                res.status(404).send({message: 'Todo not found'});
            }
        }
            
    });
});

//update an item
router.put('/api/v1/todos/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, start_date, due_date, complete } = req.body;
    connection.query('UPDATE todo_app SET title =?, description =?, start_date =?, due_date =?, complete =? WHERE id =?', [title, description, start_date, due_date, complete, id], (err, results) => {
        if(err) {
            res.status(500).send({ message: 'Error updating todo' });
        } else{
            if(results.affectedRows > 0){
                res.json({ message: 'Todo updated successfully' });
            } else{
                res.status(404).send({ message: 'Todo not found' });
            }
        }
    });
})

//delete an item
router.delete('/api/v1/todos/:id', function(req, res){
    const { id } = req.params;
    connection.query('DELETE FROM todo_app WHERE id =?', [id], (err, results) => {
        if(err) {
            res.status(500).send({ message: 'Error deleting todo' });
        } else{
            if(results.affectedRows > 0){
                res.json({ message: 'Todo deleted successfully' });
            } else{
                res.status(404).send({ message: 'Todo not found' });
            }
        }
    });
})

module.exports = router;