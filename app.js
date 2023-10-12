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


//jobs.scheduleNoPayment();
//jobs.scheduleCheckDates();  
//jobs.scheduleNotifyAll();

// apertura -> 1
// notify all (1mes)
// 
/*
date.getRemindDays(connection)
  .then((dates) => {
    console.log(dates);
  })
  .catch((error) => {
    console.error(error);
  });
*/
module.exports = app;