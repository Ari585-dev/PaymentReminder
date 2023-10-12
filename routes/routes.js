const express = require('express')
const mailController=require('../controllers/mail-controller');
const studentsController=require('../controllers/students-controller');
const notifyController=require('../controllers/notify-controller');
const whatsappController=require('../controllers/whatsapp-controller');

const route= express.Router();

// send messages 
route.post('/send-email', mailController.sendMail); 
route.post('/sendwh', whatsappController.sendWh);

//notify functions
route.post('/notifyStudents', notifyController.notifyAllPayment);
route.post('/remindPayment', notifyController.remindStudents);
route.post('/remindExtraordinary', notifyController.remindExtraordinary);
route.post('/studentPaid', notifyController.notifyPaid);

//mobile apis
route.post('/login', studentsController.studentsLogin);

//retrieve data 
route.get('/students', studentsController.allStudents);
route.post('/getStudent', studentsController.getStudent);

module.exports= route;