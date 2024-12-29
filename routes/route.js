const express = require('express');
const connection = require('../database/connection');
const router = express.Router();


    //retrieve list of todos
router.get('/', (req, res)=>{
    connection.query('select * from todo_app', (err, results)=>{
        if(err) {
            res.status(500).send({message: 'Error retrieving from todo_app table'});
        } else{
            res.json(results);
        }
            
    });
});

    //create a new todo
router.post('/', (req, res)=>{
    const {title, description, start_date, due_date, complete} = req.body;
    connection.query('INSERT INTO todo_app (title, description, start_date, due_date, complete) values (?, ?, ?, ?, ?)', [title, description, start_date, due_date, complete], (err, results)=>{
        if(err) {
            res.status(500).send({message: 'Error creating new todo'});
        } else{
            res.json({message: 'New todo created successfully'});
        }
    });
});

module.exports = router;