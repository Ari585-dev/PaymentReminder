const express = require('express')
const jobs = require('./config/jobs-manager')
const bodyParser = require('body-parser')
const date = require('./crud/Dates');
let connection = require('./config/connection');

const app= express()
const project_routes= require('./routes/routes')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/api', project_routes)

//jobs.scheduleCheckDates();
//jobs to check dates
//jobs.scheduleCheckDates();  


module.exports = app;