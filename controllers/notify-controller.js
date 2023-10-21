//const students = require('../crud/students');
const MailController = require('./mail-controller');
const HtmlManager = require('../config/html-manager');
const StudentsController = require('./students-controller');
const WhatsappController = require('./whatsapp-controller');
const DatesController = require('./dates-controller');
const Date = require('../crud/dates');
const moment = require('moment');
const xmlController = require('../config/xml-manager')
let connection = require('../config/connection');

let controller = {
  //notify students that the payment is open
    notifyAllPayment: async function (req, res) {
      try {
        const students = await StudentsController.allStudents();
        const datesOrd = await DatesController.closingDate();
        const datesExt = await DatesController.extraordinaryDate();
        let currentDate = moment();
        moment.locale("es");
        tag = 'notifyAll'; // Define tag here
        for (const student of students) {
          try {
            const [title, body] = await xmlController.getInfo(tag, student, currentDate);
            const closingDate = await Date.getClosingDate(connection);
            const html = await HtmlManager.getHtmlOpenPayment(student, datesOrd, datesExt);
            const mssg = body + " " + closingDate;
            await MailController.sendMail('req', 'res', student.mail, html, title);
            await WhatsappController.sendWh('req', 'res', student.phone, mssg);
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
        let currentDate = moment();
        moment.locale("es");
        for (const student of students) {
          try {
            const [title, body] = await xmlController.getInfo(tag, student, currentDate);
            const closingDate = await Date.getClosingDate(connection);
            const html = await HtmlManager.getHtmlReminder(student, datesOrd, datesExt);
            const mssg = body + " " + closingDate;
            await MailController.sendMail('req', 'res', student.mail, html, title);
            await WhatsappController.sendWh('req', 'res', student.phone, mssg);
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
        let currentDate = moment();
        moment.locale("es");
        for (const student of students) {
          try {
            const [title, body] = await xmlController.getInfo(tag, student, currentDate);
            const extraordinaryDate = await Date.getExtraordinaryDate(connection);
            const html = await HtmlManager.getHtmlExtraordinaryReminder(student, extraordinaryDate);
            const mssg = body + " " + extraordinaryDate;
            await MailController.sendMail('req', 'res', student.mail, html, title);
            await WhatsappController.sendWh('req', 'res', student.phone, mssg);
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
  notifyPaid: async function (req, res) {
    id = req.body.id
    try{
      tag = 'paid'; // Define tag here
      const students = await StudentsController.studentPaid(id);
      moment.locale("es");
      let currentDate = moment();
      currentDate= currentDate.format("MMMM Do YYYY");
      for (const student of students) {
        try {
          const [title, body] = await xmlController.getInfo(tag, student, currentDate);
          const html = await HtmlManager.getHtmlPaid(student, currentDate);
          const mssg = body;
           MailController.sendMail('req', 'res', student.mail, html, title);
           WhatsappController.sendWh('req', 'res', student.phone, mssg);
        } catch (error) {
          console.error('An error occurred:', error);
        }
      }
    }catch(err){
      console.error(err);
      res.status(500).send("An error occurred");
    }
  },
}

module.exports = controller;