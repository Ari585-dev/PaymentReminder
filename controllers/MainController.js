//const students = require('../crud/students');
const MailController = require('./MailController');
const MessageController = require('./MessageController');
const StudentsController = require('./StudentsController');
const WhatsappController = require('./WhatsappController');
const Information = require('../crud/information');
let connection = require('../config/connection');

let controller = {
    //notify students that the payment is open
    notifyAllPayment: async function(req, res) {
        try {
          const students = await StudentsController.allStudents();
          const mssg= "mensajesito que notifica matricula"
          for (const student of students) {
            const html = await MessageController.getHtmlOpenPayment(student);
            await MailController.sendMail(student.mail, html, student.mail, html);
            await WhatsappController.sendWh(student.phone, mssg, student.phone, mssg );
          }
          res.status(200).send(students);
        } catch (err) {
          // Handle the error
          console.error(err);
          res.status(500).send("An error occurred");
        }
    },
    //remind students that havent pay
    remindStudents: async function (req, res) {
        const date = await Information.getInformation(connection)
        
        try {
          const mssg= "Mensajesito de que pagues plis uwu"
            const students = await StudentsController.studentsWithoutPayment();
            for (const student of students) {
              const html = await MessageController.getHtmlReminder(student, date);
              await MailController.sendMail(student.mail, html, student.mail, html);
              
            }
          } catch (err) {
            // Handle the error
            console.error(err);
            res.status(500).send("An error occurred");
          }
    },
    //payment succesfully recieved
    notifyPaid: function (req, res) {
        
    },  
}

module.exports = controller;