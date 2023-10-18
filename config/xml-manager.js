const fs = require('fs');
const xml2js = require('xml2js');
const path = require('path');
const filePath = path.join(__dirname, '../templates/Information.xml');

let xmlManager = {
    getInfo: function (tag, student, currentDate) {
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
                    if (tag == "notifyAll") {
                        let body = obj.body[0].replace(/name/g, student.first_name);

                        const title = obj.title[0];
                        obj.body[0] = body;
                        resolve([title, body]);

                    } else if (tag == "remindStudents") {
                        let body = obj.body[0].replace(/name/g, student.first_name);

                        const title = obj.title[0];
                        obj.body[0] = body;
                        resolve([title, body]);

                    } else if (tag == "remindExtraordinary") {
                        let body = obj.body[0].replace(/name/g, student.first_name);

                        const title = obj.title[0];
                        obj.body[0] = body;
                        resolve([title, body]);

                    } else if (tag == "paid") {
                        const body = obj.body[0].replace(/payment/g, currentDate);

                        const title = obj.title[0];
                        obj.body[0] = body;
                        resolve([title, body]);
                    }

                });
            });
        });
    },
};

module.exports = xmlManager;
