const fs = require('fs');
const path = require('path');

const htmlFilePath = path.join(__dirname, '../templates/Reminder.html');

let controller = {
    getHtmlPrueba: (callback) => {
        fs.readFile(htmlFilePath, 'utf8', (error, html) => {
            if (error) {
                console.error(error);
                callback(error);
                return;
            }

            callback(null, html);

        });
    },

    getMessagePaymentReminder: (student, path) => {
        fs.readFile(path, 'utf8', (error, data) => {
            if (error) {
                console.error(error);
                return;
            }
            //replace with the student's data
            htmlContent = data;

            console.log(htmlContent);
        })
        return string
    }

    
}

module.exports = controller;