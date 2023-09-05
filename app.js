const express = require('express')
const controller = require('./controllers/JobsController')
const bodyParser = require('body-parser')
const Date = require('./crud/Dates');
let connection = require('./config/Connection');
const app= express()

const project_routes= require('./routes/ProjectRoute')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/api', project_routes)

/*
controller.scheduleNoPayment();
controller.schedulePaymentDateConsult();  
controller.scheduleNotifyAll();
*/

Date.getRemindDays(connection)
  .then((dates) => {
    console.log(dates);
  })
  .catch((error) => {
    console.error(error);
  });

module.exports = app;