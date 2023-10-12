const { promisify } = require('util');
const moment = require('moment');

module.exports = {
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

  getRemindDays: async function (connection) {
    
    try {
      let openingDate = await module.exports.getOpeningDate(connection);
      let closingDate = await module.exports.getClosingDate(connection);
      let extraordinaryDate = await module.exports.getExtraordinaryDate(connection);
      
      const openingDateMoment = moment(openingDate, "MMMM Do YYYY");
      const closingDateMoment = moment(closingDate, "MMMM Do YYYY");
      const extraordinaryDateMoment = moment(extraordinaryDate, "MMMM Do YYYY");
      // Calculate the number of days between opening and closing dates
      const daysInBetween = closingDateMoment.diff(openingDateMoment, 'days');
      const dayToRemind = Math.ceil(daysInBetween / 3);
      
      // Calculate reminder dates
      const ordinaryDates = [];
      for (let i = 0; i < 3; i++) {
        const reminderDate = openingDateMoment.clone().add(i * dayToRemind, 'day');
        if(closingDateMoment.diff(reminderDate, 'days') < 0){
          ordinaryDates.push(closingDateMoment);
          break
        }
        ordinaryDates.push(reminderDate.format("MMMM Do YYYY"));
      }
      
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

      return [ordinaryDates, extraDays];
    } catch (err) {
      throw err;
    }
  }
  
  
}