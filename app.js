const express = require('express');
const controller = require('./controllers/MainController');

const app= express();

const project_routes= require('./routes/ProjectRoute');



//cors

//rutas
app.use('/api', project_routes);

controller.scheduleNotifyAllPayment();

//exports
module.exports = app;