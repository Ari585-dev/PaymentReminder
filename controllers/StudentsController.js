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
        
     }
}

module.exports = controller;