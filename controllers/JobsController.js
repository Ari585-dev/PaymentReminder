const MainController = require('./MainController');
const information = require('../crud/information');
const cron = require('node-cron');

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
        cron.schedule('0 7 */2 * *', async () => {
            try {
              await information.getInformation();
              console.log('Tarea de notificación de pago realizada con éxito.');
            } catch (err) {
              console.error('Error al realizar la tarea de notificación de pago:', err);
            }
          });
      }

}

module.exports=controller;