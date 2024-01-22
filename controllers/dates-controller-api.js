let connection = require('../config/connection');
const Date = require('../crud/Dates');
const moment = require('moment');

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

  getNews: async function (req, res) {
    try {
      const info_1 = await Date.getInfo1(connection);
      const info_2 = await Date.getInfo2(connection);
      //show input
      console.log(info_1, info_2);
      //return data 
      return res.status(200).json({ info_1: info_1, info_2: info_2 });
    } catch (err) {
      // Handle the error
      console.error(err);
      return [];
    }
  },
  
}

module.exports = controller;