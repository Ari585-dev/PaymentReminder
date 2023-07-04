const nodemailer = require('nodemailer')
const MessageController = require('./MessageController');
require('dotenv').config();


let controller = {
    
    sendMail: function (req, res) {
    const email= process.env.EMAIL;
    const password= process.env.PASSWORD;
    
        MessageController.getHtmlPrueba((error, htmlContent) => {
            if (error) {

                return;
            }

            console.log("send-email reached")
            const transporter = nodemailer.createTransport({
                host: "smtp.hotmail.email",
                //post: 587,
                //secure: false,
                service: 'hotmail',
                auth: {
                    user: email,
                    pass: password
                },
            })

            const mailOpt = {
                from: password,
                to: "juliaan657@gmail.com",
                subject: "Herpes gratis ,':)!",
                html: htmlContent
            }

            transporter.sendMail(mailOpt, (error, info) => {
                if (error) {
                    res.status(500).send(error.message)
                } else {
                    console.log("email sent")
                    res.status(200).jsonp(req.body)
                }
            })
        });
    },

}

module.exports = controller;