const notifyController = require('../controllers/notify-controller');
const Date = require('../crud/dates');
const cron = require('node-cron');
const connection = require('./connection');

let jobsManager = {

  scheduleNoPayment: function (today, dates) { // days,dates
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

  scheduleNotifyAll: function (today, dates) {
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
      let currentDate = new Date().format("MMMM Do YYYY")
       // call scheduleNotifyAll -> hoy - > dates[0]
      // call scheduleNoPayment -> hoy -> dates[1]
      this.notifyAllPayment(currentDate, dates[0])
      this.scheduleNoPayment(currentDate, dates[1])
     
      } catch (err) {
        console.error('Error : Notify students of date payment open ; ', err);
      }
    });
  },


}

module.exports = jobsManager;