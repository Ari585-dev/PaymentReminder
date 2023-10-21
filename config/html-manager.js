const fs = require('fs'); //fs and path to find the path of the project
const path = require('path');
const util = require('util'); //util library to read files
const readFileAsync = util.promisify(fs.readFile);
const htmlOpenURL = path.join(__dirname, '../templates/Open.html'); //import html files  
const htmlRemindURL = path.join(__dirname, '../templates/reminder.html');
const htmlPaid = path.join(__dirname, '../templates/paid.html');
const htmlExtraordinaryRemindURL= path.join(__dirname, '../templates/ReminderExtraordinary.html');

let htmlManager = {
  //sent first day of payment
  //each function will recieve some data to replace in a html file, to be sended to every user
  getHtmlOpenPayment: async function(student, ordinary, extraordinary) {
    try {
      const html = await readFileAsync(htmlOpenURL, 'utf8'); //read html file
      const fullName= student.first_name +" "+ student.middle_name +" "+ student.last_name; //create full name, with the student object
      
      let htmlReplaced = html.replace("Nombre", fullName); // replace (html field, desired new value)
      htmlReplaced= htmlReplaced.replace("fecha1", ordinary);
      htmlReplaced= htmlReplaced.replace("fecha2", extraordinary);
      htmlReplaced= htmlReplaced.replace("total", student.tuition_value);

      return htmlReplaced; // return html modified with the students data
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  //sent during ordinary dates to remind student about the payment
  getHtmlReminder: async function (student, ordinary, extraordinary) {
    try {
      const html = await readFileAsync(htmlRemindURL, 'utf-8');
      const fullName= student.first_name +" "+ student.middle_name +" "+ student.last_name;

      let htmlReplaced = html.replace("Nombre", fullName);
      htmlReplaced= htmlReplaced.replace("fecha1", ordinary);
      htmlReplaced= htmlReplaced.replace("fecha2", extraordinary);
      htmlReplaced= htmlReplaced.replace("total", student.tuition_value);

      return htmlReplaced;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  //sent after closing date to remind student that he s close to the ordinary date and havent paid
  getHtmlExtraordinaryReminder: async function (student, extraordinary) {
    try {
      const html = await readFileAsync(htmlExtraordinaryRemindURL, 'utf-8');
      const fullName= student.first_name +" "+ student.middle_name +" "+ student.last_name;

      let htmlReplaced = html.replace("Nombre", fullName);
      htmlReplaced= htmlReplaced.replace("fecha2", extraordinary);

      return htmlReplaced;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  //notify that payment was successfully processed
  getHtmlPaid: async function(student, date) {
    try {
      const html = await readFileAsync(htmlPaid, 'utf8');
      const fullName= student.first_name +" "+ student.middle_name +" "+ student.last_name;

      let htmlReplaced = html.replace("student", fullName);
      htmlReplaced = htmlReplaced.replace("code", student.id);
      htmlReplaced = htmlReplaced.replace("identfication", student.identification);
      htmlReplaced = htmlReplaced.replace("career", student.career);
      htmlReplaced = htmlReplaced.replace("fecha", date);

      return htmlReplaced;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  
}

module.exports = htmlManager;