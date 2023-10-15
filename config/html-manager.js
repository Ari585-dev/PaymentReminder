const fs = require('fs');
const path = require('path');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const htmlOpenURL = path.join(__dirname, '../templates/Open.html');
const htmlRemindURL = path.join(__dirname, '../templates/reminder.html');
const htmlPaid = path.join(__dirname, '../templates/paid.html');
const htmlExtraordinaryRemindURL= path.join(__dirname, '../templates/ReminderExtraordinary.html');

let htmlManager = {
    
  getHtmlOpenPayment: async function(student, ordinary, extraordinary) {
    try {
      const html = await readFileAsync(htmlOpenURL, 'utf8');
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