const express = require('express')
//const mailController=require('../controllers/mail-controller');
//const whatsappController=require('../controllers/whatsapp-controller');
const student=require('../controllers/students-controller');
const notify=require('../notification/notify-controller');
const university=require('../controllers/university-controller')
const route= express.Router();

//notify functions
route.post('/notifyStudents', notify.notifyAllPayment); //remind all
route.post('/remindPayment', notify.remindStudents); //remind who havent paid
route.post('/remindExtraordinary', notify.remindExtraordinary); // remind those who havent paid in extraordinary
route.post('/studentPaid', notify.notifyPaid); // student id-> notify payment is done
route.post('/sendMessageToAll', notify.sendMessageToAll); // student id-> notify payment is done

//mobile apis
route.post('/login', student.studentsLogin);

//retrieve data 
route.get('/getStudents', student.allStudents);
route.get('/getDates', university.getDates);
route.get('/getNews', university.getNews);
route.post('/getStudent', student.getStudent);

module.exports= route;