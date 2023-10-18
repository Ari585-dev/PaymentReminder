const notifyController = require('../controllers/notify-controller');
const date = require('../crud/dates');
const cron = require('node-cron');
const moment = require('moment');
const connection = require('./connection');

let jobsManager = {

  scheduleCheckDates: function () {
    cron.schedule('*/1 * * * *', async () => { //this job will check after specified time
      try {
        date.getRemindDays(connection)
        .then(([ordinaryDates, extraDays]) => { //
          if(ordinaryDates && ordinaryDates.length>0){
            moment.locale("es");
            //let currentDate = moment()
            const currentDate = moment('2023-06-15');

            const ordinaryDatesMoment = [];
            const extraordinaryDatesMoment = [];

            //store ordinary dates as moment objects
            for (const datesOrd of ordinaryDates) {
              const formatedDate = moment(datesOrd, "MMMM Do YYYY");
              ordinaryDatesMoment.push(formatedDate);
            }

            //store extradays (after ordinary towards extraordinary) as moment object
            for (const datesOrd of extraDays) {
              const formatedDate = moment(datesOrd, "MMMM Do YYYY");
              extraordinaryDatesMoment.push(formatedDate);
            }

            let daysBetween1 = [];

            for (let i = 0; i < ordinaryDatesMoment.length; i++) {
              daysBetween1[i] = (ordinaryDatesMoment[i].diff(currentDate, 'days')) * 8.64e+7;
            }

            if(currentDate.isSameOrBefore(ordinaryDatesMoment[0])){
              
               setTimeout(() => {
                notifyController.notifyAllPayment();
              }, daysBetween1[0]);
              

               setTimeout(() => {
                notifyController.remindStudents();
              },  daysBetween1[1]);

              setTimeout(() => {
                notifyController.remindStudents();
              },  daysBetween1[2]);

              console.log("ms: "+ daysBetween1[0]+", "+ daysBetween1[1]+", "+ daysBetween1[2])
 
            } else if(currentDate.isAfter(ordinaryDatesMoment[2]) && currentDate.isBefore(extraordinaryDatesMoment[extraordinaryDatesMoment.length-1])){
              notifyController.remindExtraordinary();
            } 
          }else{
            console.log('No Dates Found');
          }
        })
        .catch((error) => {
          console.error(error);
        });
      } catch (err) {
        console.error('Error : Notify students of date payment open ; ', err);
      }
    });
  },


}

module.exports = jobsManager;