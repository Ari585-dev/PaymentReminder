const { promisify } = require('util');

module.exports={
  //login used in react-native mobile app, check if user has (id,password) = return true
  login: async function(connection, id, password) {  
    const queryAsync = promisify(connection.query).bind(connection);
    try {
      const data = await queryAsync(`SELECT id, password FROM students WHERE id='${id}' AND password='${password}'`);
      if (data.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  },

  //get all data from one specific student by his id
  getStudent: async function(connection, id) {
    const queryAsync = promisify(connection.query).bind(connection);
    try {
      const data = await queryAsync(`SELECT * FROM students WHERE id=${id}`);
      if (data.length > 0) {
        return data
      } else {
        return "data empty";
      }
    } catch (err) {
      throw err;
    }
  },
  //get all students from the db
  getAllStudents: function(connection) {
    return new Promise(function(resolve, reject) {
      connection.query("SELECT * FROM students", function(err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
          return data;
        }
      });
    });
  },

  //used in ()  
  //get every student whose havent paid the fee
  getAllStudentsWithoutPayment: async function(connection) {
    const queryAsync = promisify(connection.query).bind(connection);
    try {
      const data = await queryAsync("SELECT * FROM students WHERE payed = false");
      return data;
    } catch (err) {
      throw err;
    }
  },

  //get all student who have paid
  getAllStudentsWithPayment: async function(connection, id) {
    const queryAsync = promisify(connection.query).bind(connection);
    try {
      const data = await queryAsync("SELECT * FROM students WHERE payed = true");
      return data;
    } catch (err) {
      throw err;
    }
  }

}