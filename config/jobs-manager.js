const notifyController = require('../controllers/notify-controller');
const date = require('../crud/dates');
const cron = require('node-cron');
const moment = require('moment');
const connection = require('./connection');

let jobsManager = {

  scheduleNoPayment: function (today, ordinaryDates, extraordinaryDates) { // days,dates
        
        

       /*  if(today <= dates[size-1]){

          notifyController.remindStudents();

        } else if(today > dates[size-1] && tod) */
        
       
        //else -> call extraordinaryMessage
        if(today.isSameOrBefore(ordinaryDates[2])){

          notifyController.remindStudents();

        }else {

          console.log("error en el reminder")
        }

        console.log('Successful : Remind those who havent paid.');
      
      
   
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
        date.getRemindDays(connection)
        .then(([ordinaryDates, extraDays]) => {

          if(ordinaryDates && ordinaryDates.length>0){
            
            moment.locale("es");
            //let currentDate = moment().format("MMMM Do YYYY");
            const currentDate = moment('2023-06-14');

            const ordinaryDatesMoment= [];
            const extraordinaryDatesMoment=[];

            for (const datesOrd of ordinaryDates) {
              const formatedDate = moment(datesOrd, "MMMM Do YYYY");
              ordinaryDatesMoment.push(formatedDate);
            }

            for (const datesOrd of extraDays) {
              const formatedDate = moment(datesOrd, "MMMM Do YYYY");
              extraordinaryDatesMoment.push(formatedDate);
            }

            
            
            if(currentDate.isSameOrAfter(ordinaryDatesMoment[0]) && currentDate.isBefore(ordinaryDatesMoment[ordinaryDatesMoment.length-1])){
  
              /* let daysBetween = currentDate.diff(ordinaryDatesMoment[0], 'days');
              let milisecondsBetween = daysBetween * 8.64e+7; */

             notifyController.notifyAllPayment();

        
              
            }else if(currentDate.isBefore(ordinaryDatesMoment[0])){

              const daysBetween = ordinaryDatesMoment[0].diff(currentDate, 'days');
              const milisecondsBetween = daysBetween * 8.64e+7;

              /* setTimeout(() => {
                notifyController.notifyAllPayment();
              }, milisecondsBetween);
              */
              console.log(milisecondsBetween);
              
            } else if(currentDate.isAfter(ordinaryDatesMoment[2]) && currentDate.isSameOrBefore(extraordinaryDatesMoment[extraordinaryDatesMoment.length-1])){
              console.log("Sending extraordinaryMail reminder")
            } 
            
          }else{
            console.log('No se encontraron fechas ordinarias.');
          }

          
        })
        .catch((error) => {
          console.error(error);
        });

      
/*      

        if consultaDates => currentDate :
         esperar(diff between currentDate - dates[0])notifyAll         
         esperar (diff between currentDate-dates[1])scheduleNoPayment -> today, dates 
         esperar (diff between currentDate-dates[2])scheduleNoPayment -> today, dates 
         esperar (diff between currentDate-getExtraordinaryDate) -> today, dates
      // 
       */

        /* else if () {

        } */
     
      } catch (err) {
        console.error('Error : Notify students of date payment open ; ', err);
      }
    });
  },


}

module.exports = jobsManager;