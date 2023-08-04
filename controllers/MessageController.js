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
          const replacedHtml = html.replace("Nombre", student.name);
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
          let htmlReplaced = html.replace("Nombre", student.name);
          htmlReplaced = htmlReplaced.replace("Fecha", date);
      
          return htmlReplaced;
        } catch (error) {
          console.error(error);
          throw error;
        }
      }
      
      

    
}

module.exports = controller;