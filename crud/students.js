const { promisify } = require('util');

module.exports={

  login: async function(connection, mail, password) {  
    const queryAsync = promisify(connection.query).bind(connection);
  
    try {
      const data = await queryAsync(`SELECT mail, password FROM students WHERE mail='${mail}' AND password='${password}'`);
      if (data.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  },
    
  getAllStudents: function(connection) {
    return new Promise(function(resolve, reject) {
      connection.query("SELECT * FROM students", function(err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },
    
  getAllStudentsWithoutPayment: async function(connection) {
    const queryAsync = promisify(connection.query).bind(connection);
    try {
      const data = await queryAsync("SELECT * FROM students WHERE payed = false");
      return data;
    } catch (err) {
      throw err;
    }
  }

}