const express = require('express')
const nodemailer = require('nodemailer')
const { restart } = require('nodemon')
const fs = require('fs');
const path = require('path');
const htmlFilePath = path.join(__dirname, 'templates/Reminder.html');
let htmlContent =""


fs.readFile(htmlFilePath, 'utf8', (error, data) => {
  if (error) {
    console.error(error);
    return;
  }
  htmlContent = data;

  console.log(htmlContent);
})

const app = express()

app.post("/send-email", (req, res) => {
    console.log("send-email reached")
    const transporter = nodemailer.createTransport({
        host: "smtp.hotmail.email",
        //post: 587,
        //secure: false,
        service:'hotmail',
        auth: {
            user: 'saga_chumita@hotmail.com',
            pass: '3204086197'
        },
    })

    const mailOpt = {
        from: "saga_chumita@hotmail.com",
        to: "juliaan657@gmail.com",
        subject : "Herpes gratis :)!",
        html : htmlContent
    }

    transporter.sendMail(mailOpt, (error, info) => {
        if(error){
            res.status(500).send(error.message)
        }else{
            console.log("email sent")
            res.status(200).jsonp(req.body)
        }
    })
    
})

app.listen(3000, ()=> {
    console.log("listening in 3000")
})

