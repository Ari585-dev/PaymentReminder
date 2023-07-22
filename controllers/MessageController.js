const fs = require('fs');
const path = require('path');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);

const htmlOpenURL = path.join(__dirname, '../templates/OpenPayment.html');
const htmlRemindURL = path.join(__dirname, '../templates/Reminder.html');

let controller = {
    
    getHtmlOpenPayment: async function(student) {
        try {
          const html = await readFileAsync(htmlOpenURL, 'utf8');
          const replacedHtml = html.replace("Nombre", student.nombres);
          //console.log(replacedHtml);
          return replacedHtml;
        } catch (error) {
          console.error(error);
          throw error;
        }
      },

      getHtmlReminder: async function (student, date) {
        try {
          const html = await readFileAsync(htmlRemindURL, 'utf-8');
          let htmlReplaced = html.replace("Nombre", student.nombres);
          console.log(date); // Just for debugging purposes to see the date value
      
          // Access the necessary property and extract the date value
          const payment_opening_date = date[0].fecha_de_pago_apertura;
          const extractedDate = payment_opening_date.toISOString().split("T")[0];
      
          htmlReplaced = htmlReplaced.replace("Fecha", extractedDate);
      
          return htmlReplaced;
        } catch (error) {
          console.error(error);
          throw error;
        }
      }
      
      

    
}

module.exports = controller;