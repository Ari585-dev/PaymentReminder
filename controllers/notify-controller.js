//const students = require('../crud/students');
const MailController = require('./mail-controller');
const MessageController = require('../config/html-manager');
const StudentsController = require('./students-controller');
const WhatsappController = require('./whatsapp-controller');
const DatesController = require('./dates-controller');
const Date = require('../crud/dates');
const xmlController = require('../config/xml-manager')
let connection = require('../config/connection');

let controller = {
  //notify students that the payment is open
    notifyAllPayment: async function (req, res) {
      try {
        const students = await StudentsController.allStudents();
        const datesOrd = await DatesController.closingDate();
        const datesExt = await DatesController.extraordinaryDate();
        tag = 'notifyAll'; // Define tag here
        for (const student of students) {
          try {
            const [title, body] = await xmlController.getInfo(tag, student, datesOrd, datesExt);
            const html = await MessageController.getHtmlOpenPayment(student, datesOrd, datesExt);
            //await MailController.sendMail('req', 'res', student.mail, html, title);
            //await WhatsappController.sendWh('req', 'res', student.phone, body);
          } catch (error) {
            console.error('An error occurred:', error);
          }
        }
      } catch (err) {
        console.error(err);
      }
    },
  
    remindStudents: async function (req, res) {
      try {
        tag = 'remindStudents'; // Define tag here
        const students = await StudentsController.studentsWithoutPayment();
        const datesOrd = await DatesController.closingDate();
        const datesExt = await DatesController.extraordinaryDate();
        for (const student of students) {
          try {
            const [title, body] = await xmlController.getInfo(tag, student, datesOrd, datesExt);
            const closingDate = await Date.getClosingDate(connection);
            const html = await MessageController.getHtmlReminder(student, datesOrd, datesExt);
            const mssg = body + " " + closingDate;
            //await MailController.sendMail('req', 'res', student.mail, html, title);
            //await WhatsappController.sendWh('req', 'res', student.phone, mssg);
          } catch (error) {
            console.error('An error occurred:', error);
          }
        }
      } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred");
      }
    },

    remindExtraordinary: async function (req, res){
      try {
        tag = 'remindExtraordinary'; // Define tag here
        const students = await StudentsController.studentsWithoutPayment();
        const datesExt = await DatesController.extraordinaryDate();
       
        for (const student of students) {
          try {
            const [title, body] = await xmlController.getInfo(tag, student, datesExt);
            const extraordinaryDate = await Date.getExtraordinaryDate(connection);
            const html = await MessageController.getHtmlExtraordinaryReminder(student, extraordinaryDate);
            const mssg = body + " " + extraordinaryDate;
            //await MailController.sendMail('req', 'res', student.mail, html, title);
            //await WhatsappController.sendWh('req', 'res', student.phone, mssg);
          } catch (error) {
            console.error('An error occurred:', error);
          }
        }
      } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred");
      }

    },
  //payment succesfully recieved
  notifyPaid: function (req, res) {

  },
}

module.exports = controller;