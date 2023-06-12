const express = require('express');

const app= express();

const project_routes= require('./routes/ProjectRoute');



//cors

//rutas
app.use('/api', project_routes);

//exports
module.exports = app;