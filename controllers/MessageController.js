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

    getHtmlReminder: async function (student) {

      try {
        const html= await readFileAsync(htmlRemindURL, 'utf-8');
        const htmlReplaced= html.replace("Nombre", student.nombres);
        return htmlReplaced;

      } catch (error) {
        console.error(error);
        throw error;
      }
       /*  fs.readFile(htmlRemindURL, 'utf8', (error, data) => {
            if (error) {
                console.error(error);
                callback(error);
                return;
            }
            html = html.replace("Nombre", nombre);
            console.log(html)
            callback(null, html);
            
        }) */


        
    }

    
}

module.exports = controller;