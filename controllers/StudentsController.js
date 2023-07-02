let connection = require('../config/connection');
const students = require('../crud/students');
require('dotenv').config();


let controller = {

    allStudents:function(req, res){
        students.getAllStudents(connection,function(err,data){
         console.log(data);
        return  res.status(200).send({data}); 
        });
         
     },

     studentsWithoutPayment:function(req, res){
        students.getAllStudentsWithoutPayment(connection,function(err,data){
            return res.status(200).send({data});
        });
     }
}

module.exports = controller;