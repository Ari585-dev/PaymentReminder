let connection = require('../config/connection');
const students = require('../crud/students');
const info = require('../crud/information');
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
        return res.status(400).send("Los campos 'mail' y 'password' son requeridos.");
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
    }
}

module.exports = controller;