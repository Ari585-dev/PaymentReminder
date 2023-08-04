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
          const mssg= "Estimado estudiante, la Universidad Distrital Francisco José de Caldas le recuerda que el pago de la matrícula está actualmente abierto 😜 wasaaaaaaa"
          const subject= "UNIERSIDAD DISTRITAL: ¡PAGO DE MATRÍCULA ABIERTO!"
          for (const student of students) {
            const html = await MessageController.getHtmlOpenPayment(student);
            await MailController.sendMail(student.mail, html, student.mail, html, subject);
            await WhatsappController.sendWh(student.phone, mssg, student.phone, mssg );
          }
          
        } catch (err) {
          // Handle the error
          console.error(err);
          
        }
    },
    //remind students that havent pay
    remindStudents: async function (req, res) {
        const openingDate = await Information.getOpeningDate(connection)
        const closingDate= await Information.getClosingDate(connection);
        try {
          const mssg= `Desde la Universidad Distrital Francisco José de Caldas le informamos que usted aún no ha realizado el pago de la matrícula, recuerde que este tiene como fecha límite ${closingDate}`
          const subject= "UNIERSIDAD DISTRITAL: USTED NO HA PAGADO"
            const students = await StudentsController.studentsWithoutPayment();
            for (const student of students) {
              const html = await MessageController.getHtmlReminder(student, openingDate);
              await MailController.sendMail(student.mail, html, student.mail, html, subject);
              await WhatsappController.sendWh(student.phone, mssg, student.phone, mssg );
              
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