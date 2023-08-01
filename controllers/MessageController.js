const fs = require('fs');
const path = require('path');
const util = require('util');
const moment = require('moment');


const readFileAsync = util.promisify(fs.readFile);

const htmlOpenURL = path.join(__dirname, '../templates/OpenPayment.html');
const htmlRemindURL = path.join(__dirname, '../templates/Reminder.html');

let controller = {
    
    getHtmlOpenPayment: async function(student) {
        try {
          const html = await readFileAsync(htmlOpenURL, 'utf8');
          const replacedHtml = html.replace("Nombre", student.name);
          //console.log(replacedHtml);
          return replacedHtml;
        } catch (error) {
          console.error(error);
          throw error;
        }
      },

      getHtmlReminder: async function (student, date) {
        moment.locale("es");
        try {
          const html = await readFileAsync(htmlRemindURL, 'utf-8');
          let htmlReplaced = html.replace("Nombre", student.name);
          console.log(date); // Just for debugging purposes to see the date value
      
          // Access the necessary property and extract the date value
          const payment_opening_date = date[0].payment_opening_date;
          const extractedDate = payment_opening_date.toISOString().split("T")[0];
          const parsedDate= moment(extractedDate, "YYYY-MM-DD");
          const formattedDate = parsedDate.format("MMMM Do YYYY");
      
          htmlReplaced = htmlReplaced.replace("Fecha", formattedDate);
      
          return htmlReplaced;
        } catch (error) {
          console.error(error);
          throw error;
        }
      }
      
      

    
}

module.exports = controller;