let connection = require('../config/connection');
const date = require('../crud/dates');

let controller = {
  openingDate: async function (req, res) {
    try {
      const data = await date.getOpeningDate(connection);
      // console.log(data);
      return data;
    } catch (err) {
      // Handle the error
      console.error(err);
      return [];
    }
  },

  closingDate: async function (req, res) {
    try {
      const data = await date.getClosingDate(connection);
      // console.log(data);
      return data;
    } catch (err) {
      // Handle the error
      console.error(err);
      return [];
    }

  },

  extraordinaryDate: async function (req, res) {
    try {
      const data = await date.getExtraordinaryDate(connection);
      // console.log(data);
      return data;
    } catch (err) {
      // Handle the error
      console.error(err);
      return [];
    }

  },
}

module.exports = controller;