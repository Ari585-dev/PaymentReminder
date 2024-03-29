const express = require('express')
const jobs = require('./notification/jobs-manager')
const bodyParser = require('body-parser')
//const date = require('./crud/dates');
//let connection = require('./db_interface/connection');

const app= express()
const project_routes= require('./routes/routes')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/api', project_routes)

//jobs.scheduleCheckDates();

module.exports = app;