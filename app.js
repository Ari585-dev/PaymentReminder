const express = require('express');
const controller = require('./controllers/JobsController');
const bodyParser = require('body-parser');

const app= express();

const project_routes= require('./routes/ProjectRoute');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



app.use('/api', project_routes);

/* controller.scheduleNoPayment();
controller.schedulePaymentDateConsult(); */



module.exports = app;