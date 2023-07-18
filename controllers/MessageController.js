const fs = require('fs');
const path = require('path');

const htmlOpenURL = path.join(__dirname, '../templates/OpenPayment.html');
const htmlRemindURL = path.join(__dirname, '../templates/Reminder.html');

let controller = {
    
    getHtmlOpenPayment: (nombre, callback) => {
        fs.readFile(htmlOpenURL, 'utf8', (error, html) => {
            if (error) {
                console.error(error);
                callback(error);
                return;
            }
            html = html.replace("Nombre", nombre);
            console.log(html)
            callback(null, html);
        });
    },

    getHtmlReminder: (student, callback) => {
        fs.readFile(htmlRemindURL, 'utf8', (error, data) => {
            if (error) {
                console.error(error);
                callback(error);
                return;
            }
            html = html.replace("Nombre", nombre);
            console.log(html)
            callback(null, html);
            
        })
        
    }

    
}

module.exports = controller;