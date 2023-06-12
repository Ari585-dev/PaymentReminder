const nodemailer = require('nodemailer')
const { restart } = require('nodemon')
const MessageController = require('./MessageController');

let controller = {

    sendMail: function (req, res) {

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
                    user: 'saga_chumita@hotmail.com',
                    pass: '3204086197'
                },
            })

            const mailOpt = {
                from: "saga_chumita@hotmail.com",
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
    }
}

module.exports = controller;