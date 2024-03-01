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
        }
}

module.exports = controller;