const express = require('express')
const MailConroller=require('../controllers/MailController');
const StudentsController=require('../controllers/StudentsController');
const MainController=require('../controllers/MainController');
const WhatsappController=require('../controllers/WhatsappController');

const route= express.Router();

// send messages 
route.post('/send-email', MailConroller.sendMail); 
route.post('/sendwh', WhatsappController.sendWh);

//notify functions
route.get('/notifyStudents', MainController.notifyAllPayment);
route.get('/nopayment', StudentsController.studentsWithoutPayment);
route.post('/studentPaid', StudentsController.studentPaid);

//mobile apis
route.post('/login', StudentsController.studentsLogin);

//retrieve data 
route.get('/students', StudentsController.allStudents);

module.exports= route;