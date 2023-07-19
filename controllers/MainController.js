//const students = require('../crud/students');
const MailController = require('./MailController');
const MessageController = require('./MessageController');
const StudentsController = require('./StudentsController');
const cron = require('node-cron');

let controller = {
    //notify students that the payment is open
    notifyAllPayment: async function(req, res) {
        try {
          const students = await StudentsController.allStudents();
          for (const student of students) {
            const html = await MessageController.getHtmlOpenPayment(student);
            await MailController.sendMail(student.correo, html, student.correo, html);
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
        try {
            const students = await StudentsController.studentsWithoutPayment;
            for (const student of students) {
              const html = await MessageController.getHtmlReminder(student);
              await MailController.sendMail(student.correo, html, student.correo, html);
            }
            //res.status(200).send(students);
          } catch (err) {
            // Handle the error
            console.error(err);
            res.status(500).send("An error occurred");
          }
    },
    //payment succesfully recieved
    notifyPaid: function (req, res) {
        
    },  

    scheduleNotifyAllPayment: function() {
      // Programar la tarea para que se ejecute cada día a las 9:00 a.m.
      cron.schedule('*/2 * * * *', async () => {
        try {
          await controller.notifyAllPayment();
          console.log('Tarea de notificación de pago realizada con éxito.');
        } catch (err) {
          console.error('Error al realizar la tarea de notificación de pago:', err);
        }
      });
    },
}

module.exports = controller;