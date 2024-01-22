let connection = require('../config/connection');
const date = require('../crud/Dates');

let controller = {
  
  openingDate: async function (req, res) {
    try {
      const data = await date.getOpeningDate(connection);
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  closingDate: async function (req, res) {
    try {
      const data = await date.getClosingDate(connection);
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  extraordinaryDate: async function (req, res) {
    try {
      const data = await date.getExtraordinaryDate(connection);
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }

  }

}

module.exports = controller;