require('dotenv').config();
const mg = require('mailgun-js')

let controller = {
  //.env must store mailgun api_key and domain, and name-email "sender" 
  sendMail: function (req, res, correo, html, subject) {
    const mailgun = () =>
      mg({
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN
      });

    emailInfo = {
      from: `"${process.env.NAME}" <${process.env.EMAIL}>`,
      to: correo,
      subject: subject,
      html: html
    };

    mailgun().messages().send(emailInfo, (error, body) => {
      if (error) {
        console.log(error);
        res.json
        res.sendStatus(500);
      }else{
        console.log("email sent to : ",correo);
      }
    });
  }
}

module.exports = controller;