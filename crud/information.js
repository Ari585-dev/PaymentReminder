const { promisify } = require('util');

module.exports={
    getInformation: async function (connection) {
        const queryAsync = promisify(connection.query).bind(connection);

        try {
            const data = await queryAsync("SELECT fecha_de_pago_apertura FROM informacion");
            
            return data;
          } catch (err) {
            throw err;
            
          }
          
    }
}