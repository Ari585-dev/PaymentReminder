const MailController = require('./mail-controller');
const HtmlManager = require('../config/html-manager');
const StudentsController = require('./students-controller');
const WhatsappController = require('./whatsapp-controller');
const DatesController = require('./dates-controller');
const Date = require('../crud/dates');
const moment = require('moment');
const xmlController = require('../config/xml-manager')
let connection = require('../config/connection');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let controller = {
  //notify students that the payment is open
  notifyAllPayment: async function (req, res) {
    console.log("------------notify all students------------")
    try {
      //get all students info, open-closing dates
      const students = await StudentsController.allStudents();
      const datesOrd = await DatesController.closingDate();
      const datesExt = await DatesController.extraordinaryDate();
      //now()
      let currentDate = moment();
      moment.locale("es");
      //tag to identify in xml-manager which title(subject-mail), body(whattsapp message)
      tag = 'notifyAll';
      //for every student modify html-whatsapp message, and send them
      for (const student of students) {
        try {
          //get personalized data based on student info and subject for the email
          const [title, body] = await xmlController.getInfo(tag, student, currentDate);
          const closingDate = await Date.getClosingDate(connection); //closing date
          //get html personalized html body message
          const html = await HtmlManager.getHtmlOpenPayment(student, datesOrd, datesExt);
          const mssg = body + " " + closingDate;
          console.log("student : ", student.first_name)
          await MailController.sendMail('req', 'res', student.mail, html, title);
          await WhatsappController.sendWh('req', 'res', student.phone, mssg);
          await sleep(1000)
        } catch (error) {
          console.error('An error occurred:', error);
        }
      }
      console.log("---------------END---------------")
    } catch (err) {
      console.error(err);
    }
  },

  //remind students during ordinary dates
  remindStudents: async function (req, res) {
    console.log("------------notify students without payment------------")
    try {
      tag = 'remindStudents';
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
          console.log("student : ", student.first_name)
          await MailController.sendMail('req', 'res', student.mail, html, title);
          await WhatsappController.sendWh('req', 'res', student.phone, mssg);
          await sleep(1000)
        } catch (error) {
          console.error('An error occurred:', error);
        }
      }
      console.log("---------------END---------------")
    } catch (err) {
      console.error(err);
      res.status(500).send("An error occurred");
    }
  },

  //remind students after closing date towards ordinary date
  remindExtraordinary: async function (req, res) {
    console.log("------------extraordinary date reminder------------")
    try {
      tag = 'remindExtraordinary'; // Define tag here
      const students = await StudentsController.studentsWithoutPayment();
      const extraordinaryDate = await DatesController.extraordinaryDate();
      let currentDate = moment(); //no format?
      moment.locale("es");
      for (const student of students) {
        try {
          const [title, body] = await xmlController.getInfo(tag, student, currentDate);
          //const extraordinaryDate = await Date.getExtraordinaryDate(connection);
          const html = await HtmlManager.getHtmlExtraordinaryReminder(student, extraordinaryDate);
          const mssg = body + " " + extraordinaryDate;
          console.log("student : ", student.first_name)
          await MailController.sendMail('req', 'res', student.mail, html, title);
          await WhatsappController.sendWh('req', 'res', student.phone, mssg);
          await sleep(1000)
        } catch (error) {
          console.error('An error occurred:', error);
        }
      }
      console.log("---------------END---------------")
    } catch (err) {
      console.error(err);
      res.status(500).send("An error occurred");
    }

  },
  
  //payment succesfully recieved
  notifyPaid: async function (req, res) {
    console.log("------------student payment received------------")
    id = req.body.id
    try {
      tag = 'paid'; // Define tag here
      payed= 1;
      const students = await StudentsController.studentPaid(id);
      moment.locale("es");
      let currentDate = moment();
      currentDate = currentDate.format("MMMM Do YYYY"); //now() to string
      for (const student of students) {
        try {
          const [title, body] = await xmlController.getInfo(tag, student, currentDate);
          const html = await HtmlManager.getHtmlPaid(student, currentDate);
          const mssg = body;
          console.log("student : ", student.first_name)
          MailController.sendMail('req', 'res', student.mail, html, title);
          WhatsappController.sendWh('req', 'res', student.phone, mssg);
          await sleep(1000)
        } catch (error) {
          console.error('An error occurred:', error);
        }
      }
      console.log("---------------END---------------")
    } catch (err) {
      console.error(err);
      res.status(500).send("An error occurred");
    }
  },
}

module.exports = controller;