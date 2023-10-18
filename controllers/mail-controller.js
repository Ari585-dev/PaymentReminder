require('dotenv').config();
const mg = require('mailgun-js')

let controller = {
  //.env must store mailgun api_key and domain, and name-email "sender" 
  sendMail: function (req, res, correo, html, subject) {
    console.log("email sent to: ", correo);
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
      }
    });
  }
}

module.exports = controller;