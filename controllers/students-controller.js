let connection = require('../config/connection');
const students = require('../crud/students');
const info = require('../crud/dates');
const moment = require('moment');
//const WhatsappController = require('./WhatsappController');
const MailController = require('./mail-controller');
const MessageController = require('../config/html-manager');

require('dotenv').config();


let controller = {

  allStudents: async function(req, res) {
      try {
        const data = await students.getAllStudents(connection);
        // console.log(data);
        return data;
      } catch (err) {
        // Handle the error
        console.error(err);
        return [];
      }
    },

    studentsWithoutPayment: async function(req, res){
      try {
        const data= await students.getAllStudentsWithoutPayment(connection);
        return data;
      } catch (err) {
        console.log(err);
        return [];
      } 
    },

  studentsLogin: async function(req, res) {
    let params = req.body;
    if (!params.mail || !params.password) {
      return res.status(400).send("'mail' and 'password' are required.");
    }
    try {
      const isLoginValid = await students.login(connection, params.mail, params.password);
      if (isLoginValid) {
        return res.status(200).json({ message: "You have been logged successfully" });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send("Error en el servidor");
    }
  },

  studentPaid: async function(req, res) {
    let params = req.body;
    if (!params.id || !params.name || !params.mail) {
      return res.status(400).send("'id', 'name' and 'mail' are required.");
    }
    try {
      const student = {id: params.id, name: params.name, mail: params.mail}
      let date = new Date();
      moment.locale("es");
      const parsedDate= moment(date, "YYYY-MM-DD");
      date = parsedDate.format("MMMM Do YYYY, h:mm:ss a");
      const html = await MessageController.getHtmlPaid(student, date);
      //const mssg = body + " " + closingDate;
      await MailController.sendMail('req', 'res', student.mail, html, "PaymentDone");
      //wp part pending
      //await WhatsappController.sendWh('req', 'res', student.phone, mssg);
      
      return res.status(200).json({ message: "Student payment received succesfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Error en el servidor");
    }
  }
}

module.exports = controller;