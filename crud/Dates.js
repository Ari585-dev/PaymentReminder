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
    const queryAsync = promisify(connection.query).bind(connection);
    try {
      let openingDate = await module.exports.getOpeningDate(connection);
      let closingDate = await module.exports.getClosingDate(connection);
      const openingDateMoment = moment(openingDate, "MMMM Do YYYY");
      const closingDateMoment = moment(closingDate, "MMMM Do YYYY");
  
      // Calculate the number of days between opening and closing dates
      const daysInBetween = closingDateMoment.diff(openingDateMoment, 'days');
      const dayToRemind = Math.ceil(daysInBetween / 3);
  
      // Calculate reminder dates
      const reminderDates = [];
      for (let i = 0; i < 3; i++) {
        const reminderDate = openingDateMoment.clone().add(i * dayToRemind, 'day');
        reminderDates.push(reminderDate.format("MMMM Do YYYY"));
      }
  
      //console.log(reminderDates);
  
      return reminderDates;
    } catch (err) {
      throw err;
    }
  }
  
  
}