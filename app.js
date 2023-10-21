const express = require('express')
const jobs = require('./config/jobs-manager')
const bodyParser = require('body-parser')
const date = require('./crud/dates');
let connection = require('./config/connection');

const app= express()
const project_routes= require('./routes/routes')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/api', project_routes)

//jobs to check dates
//jobs.scheduleNoPayment();
//jobs.scheduleCheckDates();  
//jobs.scheduleNotifyAll();

module.exports = app;