const notifyController = require('../controllers/notify-controller');
const information = require('../crud/dates');
const cron = require('node-cron');
const connection = require('./connection');

let controller = {

  scheduleNoPayment: function () { // days,dates
    cron.schedule('*/1 * * * *', async () => { //3
      try {
        //if today <= dates[size-1]
        await notifyController.remindStudents();
        //else -> extraordinary
        console.log('Successful : Remind those who havent paid.');
        // for(date in dates)
        //    if hoy < date 
        //         sche..(dif(hoy|date),dates)
        //    else
        //         
      } catch (err) {
        console.error('Error : Remind those who havent paid.', err);
      }
    });
  },

  scheduleNotifyAll: function () {
    cron.schedule('*/1 * * * *', async () => {
      try {
        await notifyController.notifyAllPayment();
        console.log('Successful : Notify students of date payment open.');
      } catch (err) {
        console.error('Error : Notify students of date payment open ; ', err);
      }
    });
  },

  scheduleCheckDates: function () {
    cron.schedule('*/1 * * * *', async () => {
      try {
        Date.getRemindDays(connection)
        .then((dates) => {
          console.log(dates);
        })
        .catch((error) => {
          console.error(error);
        });
      //
      // call scheduleNotifyAll -> hoy - > dates[0]
      // call scheduleNoPayment -> hoy -> dates[1]
      } catch (err) {
        console.error('Error : Notify students of date payment open ; ', err);
      }
    });
  },


}

module.exports = controller;