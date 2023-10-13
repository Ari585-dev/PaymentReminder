const express = require('express')
const mailController=require('../controllers/mail-controller');
const studentsController=require('../controllers/students-controller');
const notifyController=require('../controllers/notify-controller');
const whatsappController=require('../controllers/whatsapp-controller');
const datesController=require('../controllers/dates-controller-api')
const route= express.Router();

// send messages 
route.post('/send-email', mailController.sendMail); 
route.post('/sendwh', whatsappController.sendWh);

//notify functions
route.get('/notifyStudents', notifyController.notifyAllPayment);
route.get('/nopayment', studentsController.studentsWithoutPayment);
route.post('/studentPaid', studentsController.studentPaid);

//mobile apis
route.post('/login', studentsController.studentsLogin);

//retrieve data 
route.get('/students', studentsController.allStudents);
route.get('/getDates', datesController.getDates);
route.post('/getStudent', studentsController.getStudent);

module.exports= route;