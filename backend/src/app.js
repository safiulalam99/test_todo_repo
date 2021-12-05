const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const faker = require('faker/locale/en_US');
require('dotenv').config();
const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(cors()); //for stopping cors errors
app.use(express.json()); //allow to use contetn type application json

//random text generator
app.get('/api/v1/task/random', (req, res) => {
  var randomName = faker.hacker.phrase();
  res.status(200).send({
    message: randomName
  });
});


//
app.get('/api/get', (req, res) => {
  res.status(200).send({
    "message": '🦄🌈🦄'
  });
});


app.use('/api/v1', api);


module.exports = app;
const port = process.env.PORT || 8000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`todo list RESTFful API server at: http://localhost:${port}`);
  /* eslint-enable no-console */
});
const localdb = "mongodb://127.0.0.1:27017/mern-todo";
const dburl = 'mongodb+srv://db:db@cluster0.l8ypo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
//const connectdb=async ()=>{
mongoose.connect(localdb,{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>console.log("connected to Db")).catch(console.error);
//};

const Todo = require('../models/Todo');

//posting
app.post('/api/todo/new',(req,res)=>{
  const todo=new Todo({
    text: req.body.text
  });
  todo.save();
  res.json(todo);
})
//getting
app.get('/api/todo', async(req, res)=> {
  const todos =await Todo.find();
  res.json(todos);
  });
//delete function
  app.delete('/api/todo/delete/:id', async(req,res)=>{
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json(result);
  })
  //checking out tasks
  app.put('/api/todo/comp/:id', async(req,res)=>{
    const todo = await Todo.findById(req.params.id);
    todo.complete = !todo.complete;
    todo.save();
    res.json(todo);
  })

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
//module.exports=connectdb;