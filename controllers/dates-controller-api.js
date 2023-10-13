let connection = require('../config/connection');
const students = require('../crud/students');
const Date = require('../crud/dates');
const moment = require('moment');
//const WhatsappController = require('./WhatsappController');
const MailController = require('./mail-controller');
const MessageController = require('../config/html-manager');

require('dotenv').config();


let controller = {

  getDates: async function (req, res) {
    console.log("miau")
    try {
      const openingDate = await Date.getOpeningDate(connection);
      const extraordinaryDate = await Date.getExtraordinaryDate(connection);
      const closingDate = await Date.getClosingDate(connection);
      console.log(openingDate, extraordinaryDate, closingDate);
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