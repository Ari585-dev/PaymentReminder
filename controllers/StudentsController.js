let connection = require('../config/connection');
const students = require('../crud/students');
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
       /*  students.getAllStudentsWithoutPayment(connection,function(err,data){
            return res.status(200).send({data});
        }); */
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