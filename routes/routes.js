const express = require('express')
//const mailController=require('../controllers/mail-controller');
//const whatsappController=require('../controllers/whatsapp-controller');
const studentsController=require('../controllers/students-controller');
const notifyController=require('../controllers/notify-controller');
const datesController=require('../controllers/dates-controller-api')
const route= express.Router();

//notify functions
route.post('/notifyStudents', notifyController.notifyAllPayment); //remind all
route.post('/remindPayment', notifyController.remindStudents); //remind who havent paid
route.post('/remindExtraordinary', notifyController.remindExtraordinary); // remind those who havent paid in extraordinary
route.post('/studentPaid', notifyController.notifyPaid); // student id-> notify payment is done

//mobile apis
route.post('/login', studentsController.studentsLogin);
//getPDFs
//getPosts

//retrieve data 
route.get('/getStudents', studentsController.allStudents);
route.get('/getDates', datesController.getDates);
route.post('/getStudent', studentsController.getStudent);

module.exports= route;