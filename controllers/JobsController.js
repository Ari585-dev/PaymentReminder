const MainController = require('./MainController');
const cron = require('node-cron');

let controller = {

    scheduleNoPayment: function() {
        // Programar la tarea para que se ejecute cada día a las 9:00 a.m.
        cron.schedule('*/1 * * * *', async () => {
          try {
            await MainController.remindStudents();
            console.log('Tarea de notificación de pago realizada con éxito.');
          } catch (err) {
            console.error('Error al realizar la tarea de notificación de pago:', err);
          }
        });
      }

}

module.exports=controller;