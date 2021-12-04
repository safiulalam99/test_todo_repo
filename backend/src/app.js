const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const faker = require('faker');
require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

//random text generator
app.get('/api/v1/task/random', (req, res) => {
  var randomName = faker.lorem.text();
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
app.post('/api/post/:id', (req,res)=>{

});
app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
