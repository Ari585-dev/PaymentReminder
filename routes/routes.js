const express = require('express')
const student=require('../controllers/students-controller');
const notify=require('../notification/notify-manager');
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
route.get('/getAllDates', university.getAllDates);
route.get('/getNews', university.getNews);
route.get('/countStudents', student.countStudents);
route.post('/getStudent', student.getStudent);

//Update Data
route.put('/updateOpening', university.modifyOpeningDate);
route.put('/updateClosing', university.modifyClosingDate);
route.put('/updateExtraordinary', university.modifyExtDate);

module.exports= route;