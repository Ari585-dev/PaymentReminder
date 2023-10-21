const express = require('express')
const jobs = require('./config/jobs-manager')
const bodyParser = require('body-parser')

const app= express()
const project_routes= require('./routes/routes')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/api', project_routes)

//jobs.scheduleCheckDates();  

module.exports = app;