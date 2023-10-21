let connection = require('../config/connection');
const Date = require('../crud/dates');
const moment = require('moment');
const MailController = require('./mail-controller');
const MessageController = require('../config/html-manager');

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
      return res.status(200).json({ openingDate: openingDate, 
        extraordinaryDate : extraordinaryDate,
        closingDate : closingDate
      });
    } catch (err) {
      // Handle the error
      console.error(err);
      return [];
    }
  },
  
}

module.exports = controller;