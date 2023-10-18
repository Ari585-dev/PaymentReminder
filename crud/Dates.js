const { promisify } = require('util');
const moment = require('moment');

module.exports = {
  //get the date of opening of the inscriptions
  getOpeningDate: async function (connection) {
    const queryAsync = promisify(connection.query).bind(connection);
    try {
      const date = await queryAsync("SELECT payment_opening_date FROM information");
      moment.locale("es");
      const payment_opening_date = date[0].payment_opening_date;
      const extractedDate = payment_opening_date.toISOString().split("T")[0];
      const parsedDate = moment(extractedDate, "YYYY-MM-DD");
      const formattedDate = parsedDate.format("MMMM Do YYYY");
      return formattedDate;
    } catch (err) {
      throw err;
    }
  },

  //get extraordinarydate (last day of payment)
  getExtraordinaryDate: async function (connection) {
    const queryAsync = promisify(connection.query).bind(connection);
    try {
      const date = await queryAsync("SELECT extraordinary_date FROM information");
      moment.locale("es");
      const extraordinary_payment_date = date[0].extraordinary_date;
      const extractedDate = extraordinary_payment_date.toISOString().split("T")[0];
      const parsedDate = moment(extractedDate, "YYYY-MM-DD");
      const formattedDate = parsedDate.format("MMMM Do YYYY");
      return formattedDate;
    } catch (err) {
      throw err;
    }
  },

  //retrieve the limit day to pay the fee before closing the ordinary inscriptions
  getClosingDate: async function (connection) {
    const queryAsync = promisify(connection.query).bind(connection);
    try {
      const date = await queryAsync("SELECT closing_payment_date FROM information");
      moment.locale("es");
      const closing_payment_date = date[0].closing_payment_date;
      const extractedDate = closing_payment_date.toISOString().split("T")[0];
      const parsedDate = moment(extractedDate, "YYYY-MM-DD");
      const formattedDate = parsedDate.format("MMMM Do YYYY");
      return formattedDate;
    } catch (err) {
      throw err;
    }
  },

  //days to remind student about payment [ordinary, extraordinary]
  getRemindDays: async function (connection) {
    try {
      let openingDate = await module.exports.getOpeningDate(connection); //first day of payment
      let closingDate = await module.exports.getClosingDate(connection); //second date
      let extraordinaryDate = await module.exports.getExtraordinaryDate(connection); //extraordinary date
       //convert data(string) to moment object
      const openingDateMoment = moment(openingDate, "MMMM Do YYYY");
      const closingDateMoment = moment(closingDate, "MMMM Do YYYY");
      const extraordinaryDateMoment = moment(extraordinaryDate, "MMMM Do YYYY");
      // Calculate the number of days between opening and closing dates
      const daysInBetween = closingDateMoment.diff(openingDateMoment, 'days');
      //Get quantity of days that can be used to remind (2 days)
      const dayToRemind = Math.ceil(daysInBetween / 3);
      //openingDateMoment + dayToRemind = reminderDate, till reminderDate >= closingDateMoment
      const ordinaryDates = [];
      for (let i = 0; i < 3; i++) {
        const reminderDate = openingDateMoment.clone().add(i * dayToRemind, 'day');
        if(closingDateMoment.diff(reminderDate, 'days') < 0){  // change to = ?
          ordinaryDates.push(closingDateMoment);
          break
        }
        ordinaryDates.push(reminderDate.format("MMMM Do YYYY"));
      }
      //days to remind between last regular day oportunity to last chance in extraordinary
      const extra_OrdinaryDiff = extraordinaryDateMoment.diff(closingDateMoment, 'days');
      const extraRemind = Math.ceil(extra_OrdinaryDiff / 2)

      const extraDays=[]
      for(let i=0; i<2; i++){
        const reminderDate = closingDateMoment.add(extraRemind, 'day')
        if(extraordinaryDateMoment.diff(reminderDate, 'days') < 0){
          ordinaryDates.push(extraordinaryDateMoment);
          break
        }
        extraDays.push(reminderDate.format("MMMM Do YYYY"))
      }
      //return in an array dates to remind as ordinary dates (between opening and closing)
      //and extra days, between closing and extraordinary date
      return [ordinaryDates, extraDays]; 
    } catch (err) {
      throw err;
    }
  }
}