const fs = require('fs');
const xml2js = require('xml2js');
const path = require('path');
const filePath = path.join(__dirname, '../templates/Information.xml');

//functions to take data from xml files, used in email subject and whattsapp messages
let xmlManager = {
    //tag is a variable which helps to indentify which tag in the xml is needed
    //tags : notifyAll-paid-remindStudents-remindExtraordinary
    // |----- title(used in html subjects), body (used in whatsapp messages) 
    getInfo: function (tag, student, currentDate) {
        return new Promise((resolve, reject) => {
            //read file
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading the file:', err);
                    reject(err);
                    return;
                }
                //convert xml to string
                xml2js.parseString(data, (parseErr, result) => {
                    if (parseErr) {
                        console.error('Error parsing XML:', parseErr);
                        reject(parseErr);
                        return;
                    }
                    const obj = result.Messages[tag][0];
                    //first message, notify everyone about payment, every student will have it's name 
                    if (tag == "notifyAll") {
                        //replace into the body (xmlText, newText)-> (name, juan)
                        let body = obj.body[0].replace(/name/g, student.first_name);
                        //store title from tag
                        const title = obj.title[0];
                        obj.body[0] = body;
                        //return title and body with modification to add students name
                        resolve([title, body]);
                    }else if (tag == "remindStudents") {
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
