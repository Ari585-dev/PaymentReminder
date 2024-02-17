const mailSender = require('../messages/senders/mail-controller');
const whatsAppSender = require('../messages/senders/whatsapp-controller');
const emailCreate = require('../messages/message_creation/html-manager');
const messageInfo = require('../messages/message_creation/xml-manager')
const student = require('../controllers/students-controller');
const university = require('../controllers/university-controller');

//const Date = require('../crud/Dates');
const moment = require('moment');

let connection = require('../db_interface/connection');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let controller = {
  //notify students that the payment is open
  notifyAllPayment: async function (req, res) {
    console.log("------------notify all students------------")
    try {
      //get all students info, open-closing dates
      const students = await student.allStudents();
      const datesOrd = await university.closingDate();
      const datesExt = await university.extraordinaryDate();
      //now()
      let currentDate = moment();
      moment.locale("es");
      //tag to identify in xml-manager which title(subject-mail), body(whattsapp message)
      tag = 'notifyAll';
      //for every student modify html-whatsapp message, and send them
      for (const student of students) {
        try {
          //get personalized data based on student info and subject for the email
          const [title, body] = await messageInfo.getInfo(tag, student, currentDate);
          //const openingPayment = await Date.getOpeningDate(connection); //opening date
          const openingPayment = await university.openingDate(); //opening date
          //get html personalized html body message
          const html = await emailCreate.getHtmlOpenPayment(student, datesOrd, datesExt);
          const mssg = body + " " + openingPayment;
          console.log("student : ", student.first_name)
          await mailSender.sendMail('req', 'res', student.mail, html, title);
          await whatsAppSender.sendWh('req', 'res', student.phone, mssg);
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
      const students = await student.studentsWithoutPayment();
      const datesOrd = await university.closingDate();
      const datesExt = await university.extraordinaryDate();
      let currentDate = moment();
      moment.locale("es");
      for (const student of students) {
        try {
          const [title, body] = await messageInfo.getInfo(tag, student, currentDate);
          //const closingDate = await Date.getClosingDate(connection);
          const html = await emailCreate.getHtmlReminder(student, datesOrd, datesExt);
          const mssg = body + " " + datesOrd;
          console.log("student : ", student.first_name)
          await mailSender.sendMail('req', 'res', student.mail, html, title);
          await whatsAppSender.sendWh('req', 'res', student.phone, mssg);
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
      const students = await student.studentsWithoutPayment();
      const extraordinaryDate = await university.extraordinaryDate();
      let currentDate = moment(); //no format?
      moment.locale("es");
      for (const student of students) {
        try {
          const [title, body] = await messageInfo.getInfo(tag, student, currentDate);
          //const extraordinaryDate = await Date.getExtraordinaryDate(connection);
          const html = await emailCreate.getHtmlExtraordinaryReminder(student, extraordinaryDate);
          const mssg = body + " " + extraordinaryDate;
          console.log("student : ", student.first_name)
          await mailSender.sendMail('req', 'res', student.mail, html, title);
          await whatsAppSender.sendWh('req', 'res', student.phone, mssg);
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
      const students = await student.studentPaid(id);
      moment.locale("es");
      let currentDate = moment();
      currentDate = currentDate.format("MMMM Do YYYY"); //now() to string
      for (const student of students) {
        try {
          const [title, body] = await messageInfo.getInfo(tag, student, currentDate);
          const html = await emailCreate.getHtmlPaid(student, currentDate);
          const mssg = body;
          console.log("student : ", student.first_name)
          mailSender.sendMail('req', 'res', student.mail, html, title);
          whatsAppSender.sendWh('req', 'res', student.phone, mssg);
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

  //message to all users in the db
  sendMessageToAll: async function (req, res) {
    console.log("------------Send message to all------------")
    title = req.body.title
    message = req.body.message
    console.log("message to send : ", title, message)
    try {
      //get all students info, open-closing dates
      const students = await student.allStudents();
      for (const student of students) {
        try {
          const html = await emailCreate.getHtmlMessageToAll(student, title, message);
          console.log("student : ", student.first_name)
          await mailSender.sendMail('req', 'res', student.mail, html, title);
          await whatsAppSender.sendWh('req', 'res', student.phone, message);
          await sleep(1000)
        } catch (error) {
          console.error('An error occurred:', error);
        }
      }
      console.log("---------------END---------------")
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = controller;