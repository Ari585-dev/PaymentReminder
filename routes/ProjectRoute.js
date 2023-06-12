const express = require('express')
const MailConroller=require('../controllers/MailController');

const route= express.Router();



route.post('/send-email', MailConroller.sendMail);

module.exports= route;