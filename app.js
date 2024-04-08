const express = require('express')
require('dotenv').config();
const jobs = require('./notification/jobs-manager')
const bodyParser = require('body-parser')

const app= express()
const project_routes= require('./routes/routes')

PORT= process.env.FRONTENDPORT;


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/api', project_routes)

jobs.scheduleCheckDates();

module.exports = app;