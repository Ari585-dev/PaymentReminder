const fs = require('fs');
const path = require('path');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const htmlOpenURL = path.join(__dirname, '../templates/openPayment.html');
const htmlRemindURL = path.join(__dirname, '../templates/reminder.html');
const htmlPaid = path.join(__dirname, '../templates/paid.html');

let htmlManager = {
    
  getHtmlOpenPayment: async function(student) {
    try {
      const html = await readFileAsync(htmlOpenURL, 'utf8');
      const htmlReplaced = html.replace("Nombre", student.name);
      return htmlReplaced;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getHtmlReminder: async function (student, date) {
    try {
      const html = await readFileAsync(htmlRemindURL, 'utf-8');
      let htmlReplaced = html.replace("Nombre", student.name);
      htmlReplaced = htmlReplaced.replace("Fecha", date);
      return htmlReplaced;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getHtmlPaid: async function(student, date) {
    try {
      const html = await readFileAsync(htmlPaid, 'utf8');
      let htmlReplaced = html.replace("Nombre", student.name);
      htmlReplaced = htmlReplaced.replace("Fecha", date);
      return htmlReplaced;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  
}

module.exports = htmlManager;