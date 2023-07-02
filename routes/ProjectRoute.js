const express = require('express')
const MailConroller=require('../controllers/MailController');


const route= express.Router();



route.post('/send-email', MailConroller.sendMail);
route.get('/students',MailConroller.allStudents);
route.get('/nopayment', MailConroller.studentsWithoutPayment);

module.exports= route;