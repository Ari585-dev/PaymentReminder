let connection = require('../config/connection');
const students = require('../crud/students');
const Date = require('../crud/dates');
const moment = require('moment');
//const WhatsappController = require('./WhatsappController');
const MailController = require('./mail-controller');
const MessageController = require('../config/html-manager');

require('dotenv').config();


let controller = {

  allStudents: async function (req, res) {
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

  studentsWithoutPayment: async function (req, res) {
    try {
      const data = await students.getAllStudentsWithoutPayment(connection);
      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
  },

  studentsLogin: async function (req, res) {
    console.log("reached login")
    let params = req.body;
    if (!params.id || !params.password) {
      return res.status(400).send("'id' and 'password' are required.");
    }
    try {
      const isLoginValid = await students.login(connection, params.id, params.password);
      console.log(params.id, params.password)
      if (isLoginValid) {
        return res.status(200).json({ message: "You have been logged successfully" });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  },

  getStudent: async function (req, res) {
    let params = req.body;
    console.log(params)
    if (!params.id) {
      return res.status(400).send("id is required");
    }
    try {
      const data = await students.getStudent(connection, params.id);
      console.log(data)
      return res.status(200).json({ student: data });
    } catch (err) {
      // Handle the error
      console.error(err);
      return [];
    }
  },

  studentPaid: async function (req, res) {
    //FALTA AQUÍ
    let params = req.body;
    if (!params.id) {
      return res.status(400).send(" id are required.");
    }else{
      try {
        
      } catch (error) {
        console.log(error);
      }
    }
   
  }
}

module.exports = controller;