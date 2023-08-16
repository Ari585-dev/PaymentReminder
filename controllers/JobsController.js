const MainController = require('./MainController');
const information = require('../crud/information');
const cron = require('node-cron');
const connection = require('../config/connection');

let controller = {

    scheduleNoPayment: function() {
        cron.schedule('*/1 * * * *', async () => {
          try {
            await MainController.remindStudents();
            console.log('Successful : Remind those who havent paid.');
          } catch (err) {
            console.error('Error : Remind those who havent paid.', err);
          }
        });
      },
      
      schedulePaymentDateConsult: function() {
        cron.schedule('*/1 * * * *', async () => {
            try {
              await information.getOpeningDate(connection);
              console.log('Successful : Consult date payment.');
            } catch (err) {
              console.error('Error : Consult date payment ; ', err);
            }
          });
      },

      scheduleNotifyAll: function() {
        cron.schedule('*/1 * * * *', async () => {
            try {
              await MainController.notifyAllPayment();
              console.log('Successful : Notify students of date payment open.');
            } catch (err) {
              console.error('Error : Notify students of date payment open ; ', err);
            }
          });
      },



}

module.exports=controller;