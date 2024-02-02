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

  modifyOpeningDate: async function (req, res){
  let params = req.body;
    const opening = params.openingDate
    const openingValid=moment(opening, 'YYYY-MM-DD', true).isValid();

    try {
      if (!params || Object.keys(params).length === 0) {
        return res.status(400).send('Please, insert the new dates you want to update.');
      } else {

        if(openingValid){
          await Date.updateOpeningDate(connection, opening)
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
  },

  modifyClosingDate: async function (req, res){
    let params = req.body;
      const closing = params.closingDate
      const closingValid=moment(closing, 'YYYY-MM-DD', true).isValid();
  
      try {
        if (!params || Object.keys(params).length === 0) {
          return res.status(400).send('Please, insert the new dates you want to update.');
        } else {
  
          if(closingValid){
            await Date.updateClosingDate(connection, closing)
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
    },

    modifyExtDate: async function (req, res){
      let params = req.body;
        const extraordinary = params.extraordinaryDate
        const extraordinaryValid=moment(extraordinary, 'YYYY-MM-DD', true).isValid();
    
        try {
          if (!params || Object.keys(params).length === 0) {
            return res.status(400).send('Please, insert the new dates you want to update.');
          } else {
    
            if(extraordinaryValid){
              await Date.updateExtDate(connection, extraordinary)
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
      },

    




  
}

module.exports = controller;