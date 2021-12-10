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
app.get('/api/v1/task/ran', (req, res) => {
  let randomName = faker.hacker.phrase();
  res.status(200).send({
    id: Date.now(),
    message: randomName
  });
});

module.exports = app;
const port = process.env.PORT || 8000;
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

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
