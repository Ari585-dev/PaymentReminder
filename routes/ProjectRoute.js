const express = require('express')
const MailConroller=require('../controllers/MailController');
const StudentsController=require('../controllers/StudentsController');

const route= express.Router();

//routes Mail Controller

//email payment open
//email reminder to pay
//email payment recieved
route.post('/send-email', MailConroller.sendMail); //send email

//routes Students Controller

///login
///getStudent data by his id (for app display his name etc)
route.get('/students',StudentsController.allStudents); // get all students (all remind payment 1st day)
route.get('/nopayment', StudentsController.studentsWithoutPayment); // get students that haven't pay
//get if student paid by his id

//routes University Controller

//getStatus payment open or not
//getDate date of the payment

module.exports= route;