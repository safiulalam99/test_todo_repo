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

app.get('/api/v1', (req, res) => {
  res.status(200).send({
    "message": '👋🌎🌍🌏'
  });
});
app.get('/api/api', (req, res) => {
  res.json({
    message: 'Team 05'
  });
});
//random text generator
app.get('api/v1/task/ran', (req, res) => {
  let randomName = faker.hacker.phrase();
  res.status(200).send({
    id: Date.now(),
    message: randomName
  });
});

module.exports = app;
const port = process.env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`todo list RESTFful API server at: http://localhost:${port}`);
  /* eslint-enable no-console */
});

const dburl = 'mongodb+srv://db:db@cluster0.l8ypo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(dburl,{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>console.log("connected to Db")).catch(error=>console.log(error));


const Todo = require('../models/Todo');


app.get('/api/v1', (req, res) => {
  res.status(200).send({
    "message": '👋🌎🌍🌏'
  });
});

//posting
app.post('/api/v1/task/post',(req,res)=>{
  const todo=new Todo({
    text: req.body.text,
    manmade: true
  });
  todo.save();
  res.json(todo);
})

//getting
app.get('/api/v1/task/random', (req, res)=> {


   Todo.find({manmade:{$ne:true}}).sort({"timestamp":-1}).limit(3).then(function(post){
    const ids = post.map((doc)=> doc._id);
    console.log(post);
    Todo.deleteMany({_id: {$in: ids}}, (err)=> {
  let records=[];
      for(let i= 0;i<3;i++)
      {
        let randomName1 = faker.hacker.phrase();
       records.push({text:randomName1});
          }
      Todo.insertMany(records).then(function (result)
      {  
       Todo.find().then(todos => {res.json(todos);})
           })
            console.log(records);
              });
      }).catch(err=>{console.log(err)});
    });

    
//delete function
  app.delete('/api/v1/task/delete/:id', (req,res)=>{
    Todo.findByIdAndDelete(req.params.id).then(result => {
  res.json(result);
}).catch(err=>{
  res.status(406);
  
})
 });

//checking out tasks
app.get('/api/v1/task/comp/:id', (req,res)=>{
   Todo.findOne({"_id":req.params.id},(err,todo)=>{
    if(err){throw err;}
    if(todo){
      todo.complete = !todo.complete;
      todo.save();
      res.json(todo);
      }

   }).then(todo=>{
   
  }).catch(err=>console.log(err));

})
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
