const { promisify } = require('util');

module.exports={
    getInformation: async function (connection) {
        const queryAsync = promisify(connection.query).bind(connection);

        try {
            const data = await queryAsync("SELECT payment_opening_date FROM information");
            
            return data;
          } catch (err) {
            throw err;
            
          }
          
    }
}