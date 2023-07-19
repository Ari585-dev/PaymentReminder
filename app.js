const express = require('express');
const controller = require('./controllers/JobsController');

const app= express();

const project_routes= require('./routes/ProjectRoute');


app.use('/api', project_routes);

controller.scheduleNoPayment();




module.exports = app;