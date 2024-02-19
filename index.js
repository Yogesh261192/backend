const express= require('express');
const mongoose = require('mongoose');
const Todo = require('./todoschema');
const { v4: uuidv4 } = require('uuid');
const { connectToMongoDB, closeMongoDBConnection } = require('./db');
const bodyparser = require('body-parser');
const cors= require('cors');


connectToMongoDB();
const app= express();
const PORT= process.env.PORT || 5000
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors())
app.use(express.json());
app.get('/gettodo', async(req,res)=>{
    try {
        const allTodo = await Todo.find({});
        res.json(allTodo);
      } catch (error) {
        console.error('Error retrieving persons:', error);
        res.status(500).send('Internal Server Error yoegsh');
      }
})
app.post('/addtodo', async(req,res)=>{
    console.log(req.body)
    try {
        const newTodo = new Todo({
            id:uuidv4(),
            todo: req.body.name
        })
        const result = await newTodo.save();
        res.json(result);
      } catch (error) {
        console.error('Error retrieving persons:', error);
        res.status(500).send('Internal Server Error yogesh');
      }
})

app.delete('/deletetodo', async (req,res)=>{
  console.log(req.body)
  try {
   const result = await Todo.deleteOne({ id: req.body.id });

    res.json(result);
  } catch (error) {
    console.error('Error retrieving persons:', error);
    res.status(500).send('Internal Server Error yogesh');
  }
})

app.listen(PORT, ()=>{
    console.log('running on ' + PORT)
})
