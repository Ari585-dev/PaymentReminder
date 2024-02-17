let connection = require('../db_interface/connection');
const student = require('../db_interface/student');

require('dotenv').config();


let controller = {

  allStudents: async function (req, res) {
    try {
      const data = await student.getAllStudents(connection);
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  studentsWithoutPayment: async function (req, res) {
    try {
      const data = await student.getAllStudentsWithoutPayment(connection);
      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
  },

  studentsLogin: async function (req, res) {
    let params = req.body;
    if (!params.id || !params.password) {
      return res.status(400).send("'id' and 'password' are required.");
    }
    try {
      const isLoginValid = await student.login(connection, params.id, params.password);
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
    //console.log(params)
    if (!params.id) {
      return res.status(400).send("id is required");
    }
    try {
      const data = await student.getStudent(connection, params.id);
      //console.log(data)
      return res.status(200).json({ student: data });
    } catch (err) {
      // Handle the error
      console.error(err);
      return [];
    }
  },

  studentPaid: async function (id) {
    try {
      const data = await student.getStudent(connection, id);
      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
   
  }
}

module.exports = controller;