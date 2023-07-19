const students = require('../crud/students');
const MeailController = require('./MailController');
const MessageController = require('./MessageController');
const StudentsController = require('./StudentsController');

let controller = {
    //notify students that the payment is open
    notifyAllPayment: function (req, res) {
        students = StudentsController.allStudents()
        students.forEach(student => {
            console.log(student)
        });
        res.status(200).send(students)
    },
    //remind students that havent pay
    remindStudents: function (req, res) {
        
    },
    //payment succesfully recieved
    notifyPaid: function (req, res) {
        
    },  
}

module.exports = controller;