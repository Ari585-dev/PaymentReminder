const notifyController = require('../controllers/notify-controller');
const date = require('../crud/dates');
const cron = require('node-cron');
const moment = require('moment');
const connection = require('./connection');

let jobsManager = {
  //manage the scheduling of the reminding dates of every case
  scheduleCheckDates: function () {
    cron.schedule('*/1 * * * *', async () => { //this job will check after specified time
      try {
        date.getRemindDays(connection)
        .then(([ordinaryDates, extraDays]) => { // the ordinary and extra days to convert them into moment objets again
          if(ordinaryDates && ordinaryDates.length>0){
            //now()
            moment.locale("es");
            const currentDate = moment('2023-06-19');//let currentDate = moment()

            const ordinaryDatesMoment = [];
            const extraordinaryDatesMoment = [];
            const ordinaryDatesMiliseconds = [];
            const extraordinaryDatesMiliseconds = [];

            //store ordinary dates as moment objects
            for (const datesOrd of ordinaryDates) {
              const formatedDate = moment(datesOrd, "MMMM Do YYYY");
              ordinaryDatesMoment.push(formatedDate);
            }

            //store extradays (after ordinary towards extraordinary) as moment object
            for (const datesExt of extraDays) {
              const formatedDate = moment(datesExt, "MMMM Do YYYY");
              extraordinaryDatesMoment.push(formatedDate);
            }

            //ordinary dates to ms, to be used in the timeouts
            for (let i = 0; i < ordinaryDatesMoment.length; i++) {
              ordinaryDatesMiliseconds[i] = (ordinaryDatesMoment[i].diff(currentDate, 'days')) * 8.64e+7;
            }

            //extraordinary dates to ms, to be used in the timeouts
            for (let i = 0; i < extraordinaryDatesMoment.length; i++) {
              extraordinaryDatesMiliseconds[i] = (extraordinaryDatesMoment[i].diff(currentDate, 'days')) * 8.64e+7;
            }

            //schedule when the functions will be excecuted
            if(currentDate.isSameOrBefore(ordinaryDatesMoment[0])){
               setTimeout(() => {
                notifyController.notifyAllPayment(); //notify everyone about payment open
              }, ordinaryDatesMiliseconds[0]);
               setTimeout(() => {
                notifyController.remindStudents(); //first reminder about payment
              }, 10000 /* ordinaryDatesMiliseconds[1] */);
              setTimeout(() => {
                notifyController.remindStudents(); //second reminder about payment
              },  20000/* ordinaryDatesMiliseconds[2] */);
              setTimeout(() => {
                notifyController.remindExtraordinary(); //first reminder about extraordinary payment
              }, 30000 /* extraordinaryDatesMiliseconds[0] */);
              setTimeout(() => {
                notifyController.remindExtraordinary(); //first reminder about extraordinary payment
              },  40000/* extraordinaryDatesMiliseconds[1] */);
              
              //print in ms the schedule time for first day of payment and reminders (ordinary)
              console.log("open payment: "+ ordinaryDatesMiliseconds[0]+"ms, remind 1 "+ ordinaryDatesMiliseconds[1]+"ms, remind 2 "+ ordinaryDatesMiliseconds[2]+"ms");
              console.log("Extraordinary: "+ extraordinaryDatesMiliseconds[0]+"ms, remind 1 "+ extraordinaryDatesMiliseconds[1]+"ms");
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