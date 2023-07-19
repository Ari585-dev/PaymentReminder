const nodemailer = require('nodemailer')
const MessageController = require('./MessageController');
require('dotenv').config();
const mg = require('mailgun-js') 

let controller = {
    
    sendMail: function (req, res, correo, html) {
        console.log(correo)
        console.log(html)
        //MessageController.getHtmlOpenPayment(nombre, (error, html) => {
            const mailgun= () => 
            mg({
                apiKey: process.env.MAILGUN_API_KEY,
                domain: process.env.MAILGUN_DOMAIN
            })
            emailInfo={
                from: `"${process.env.NAME}" <${process.env.EMAIL}>`,   
                to: correo,
                subject: 'User Registered',
                html: html
            }
            mailgun().messages().send(emailInfo, (error, body)=>{
                if(error){
                    console.log(error)
                    res.status(500).send({
                        message: "xd"
                    })
                }else{
                    res.send({message:body})
                    res.status(200).send()
                }
            })
        //});
    },

}

module.exports = controller;