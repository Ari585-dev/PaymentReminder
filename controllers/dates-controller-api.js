let connection = require('../config/connection');
const Date = require('../crud/dates');

require('dotenv').config();


let controller = {

  getDates: async function (req, res) {
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