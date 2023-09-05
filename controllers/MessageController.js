const fs = require('fs');
const path = require('path');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const htmlOpenURL = path.join(__dirname, '../templates/OpenPayment.html');
const htmlRemindURL = path.join(__dirname, '../templates/Reminder.html');
const htmlPaid = path.join(__dirname, '../templates/Paid.html');

let controller = {
    
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

module.exports = controller;