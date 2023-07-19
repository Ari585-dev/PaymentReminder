//const students = require('../crud/students');
const MailController = require('./MailController');
const MessageController = require('./MessageController');
const StudentsController = require('./StudentsController');

let controller = {
    //notify students that the payment is open
    notifyAllPayment: async function(req, res) {
        try {
          const students = await StudentsController.allStudents();
          for (const student of students) {
            const html = await MessageController.getHtmlOpenPayment(student);
            await MailController.sendMail(student.correo, html, student.correo, html);
          }
          //res.status(200).send(students);
        } catch (err) {
          // Handle the error
          console.error(err);
          res.status(500).send("An error occurred");
        }
    },
    //remind students that havent pay
    remindStudents: function (req, res) {
        
    },
    //payment succesfully recieved
    notifyPaid: function (req, res) {
        
    },  
}

module.exports = controller;