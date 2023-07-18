const nodemailer = require('nodemailer')
const MessageController = require('./MessageController');
require('dotenv').config();
const mg = require('mailgun-js') 

let controller = {
    
    sendMail: function (req, res) {
        MessageController.getHtmlPrueba((error, htmlContent) => {
            const mailgun= () => 
            mg({
                apiKey: process.env.MAILGUN_API_KEY,
                domain: process.env.MAILGUN_DOMAIN
            })
            emailInfo={
                from: '"Julian" <juliandr544@gmail.com>',
                to: 'seragial@gmail.com',
                subject: 'User Registered',
                html: htmlContent
            }
            mailgun().messages().send(emailInfo, (error, body)=>{
                if(error){
                    console.log(error)
                    res.status(500).send({
                        message: "xd"
                    })
                }else{
                    res.send({message:"hihijajaj"})
                }
            })
        });
    },

}

module.exports = controller;