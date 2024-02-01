const express = require('express')
require('dotenv').config();
const jobs = require('./config/jobs-manager')
const bodyParser = require('body-parser')
const date = require('./crud/Dates');
let connection = require('./config/connection');

const app= express()
const project_routes= require('./routes/routes')

PORT= process.env.FRONTENDPORT;

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', `${PORT}`);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.use('/api', project_routes)

//jobs.scheduleCheckDates();
//jobs to check dates
//jobs.scheduleCheckDates();  


module.exports = app;