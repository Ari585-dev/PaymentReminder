const fs = require('fs');
const xml2js = require('xml2js');
const filePath = 'templates/Information.xml';

let controller = {
    getInfo: function(tag) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading the file:', err);
                    reject(err);
                    return;
                }

                xml2js.parseString(data, (parseErr, result) => {
                    if (parseErr) {
                        console.error('Error parsing XML:', parseErr);
                        reject(parseErr);
                        return;
                    }

                    const obj = result.Messages[tag][0];
                    const title = obj.title[0];
                    const body = obj.body[0];

                    resolve([title, body]);
                });
            });
        });
    },
};

module.exports = controller;
