const MainController = require('./MainController');
const information = require('../crud/information');
const cron = require('node-cron');
const connection = require('../config/connection');

let controller = {

    scheduleNoPayment: function() {
        cron.schedule('*/1 * * * *', async () => {
          try {
            await MainController.remindStudents();
            console.log('Tarea de notificación de pago realizada con éxito.');
          } catch (err) {
            console.error('Error al realizar la tarea de notificación de pago:', err);
          }
        });
      },
      
      schedulePaymentDateConsult: function() {
        cron.schedule('*/1 * * * *', async () => {
            try {
              await information.getOpeningDate(connection);
              console.log('Tarea de notificación de pago realizada con éxito.');
            } catch (err) {
              console.error('Error al realizar la tarea de notificación de pago:', err);
            }
          });
      },

      scheduleNotifyAll: function() {
        cron.schedule('*/1 * * * *', async () => {
            try {
              await MainController.notifyAllPayment();
              console.log('Tarea de notificación de pago realizada con éxito.');
            } catch (err) {
              console.error('Error al realizar la tarea de notificación de pago:', err);
            }
          });
      },



}

module.exports=controller;