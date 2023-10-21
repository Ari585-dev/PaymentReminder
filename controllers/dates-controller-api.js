let connection = require('../config/connection');
const Date = require('../crud/dates');

require('dotenv').config();
//this is used for the react native app
let controller = {
  //get all 3 dates from the db opening, closing, extraordinary
  getDates: async function (req, res) {
    try {
      const openingDate = await Date.getOpeningDate(connection);
      const closingDate = await Date.getClosingDate(connection);
      const extraordinaryDate = await Date.getExtraordinaryDate(connection);
      //show input
      console.log(openingDate, extraordinaryDate, closingDate);
      //return data 
      return res.status(200).json({
        openingDate: openingDate,
        extraordinaryDate: extraordinaryDate,
        closingDate: closingDate
      });
    } catch (err) {
      // Handle the error
      console.error(err);
      return [];
    }
  },


  modifyallDates: async function (req, res) {
    let params = req.body;
    const opening = params.openingDate
    const closing = params.closingDate;
    const extraordinary = params.extraordinaryDate;

    const openingValid=moment(opening, 'YYYY-MM-DD', true).isValid();
    const closeingValid=moment(closing, 'YYYY-MM-DD', true).isValid();;
    const extraordinaryValid=moment(extraordinary, 'YYYY-MM-DD', true).isValid();;
    try {
      if (!params || Object.keys(params).length === 0) {
        return res.status(400).send('Please, insert the new dates you want to update.');
      } else {

        if(openingValid && closeingValid && extraordinaryValid){
          const data = await Date.updateallDates(connection, opening, closing, extraordinary)
          console.log(params);
          return res.status(200).send('Dates are insterted');
        }else{
          return res.status(400).send('Invalid format, please insert the dates with the following format: YYYY-MM-DD')
        }
      
      }

    } catch (err) {
      console.error(err);
      return [];

    }
  }

}

module.exports = controller;