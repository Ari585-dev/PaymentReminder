let connection = require('../db_interface/connection');
const university = require('../db_interface/university');

let controller = {
  
  openingDate: async function (req, res) {
    try {
      const data = await university.getOpeningDate(connection);
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  closingDate: async function (req, res) {
    try {
      const data = await university.getClosingDate(connection);
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  extraordinaryDate: async function (req, res) {
    try {
      const data = await university.getExtraordinaryDate(connection);
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }

  },

  getDates: async function (req, res) {
    try {
      const openingDate = await university.getOpeningDate(connection);
      const closingDate = await university.getClosingDate(connection);
      const extraordinaryDate = await university.getExtraordinaryDate(connection);
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

  getNews: async function (req, res) {
    try {
      const info_1 = await university.getInfo1(connection);
      const info_2 = await university.getInfo2(connection);
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