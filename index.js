const app = require('./app');
const mysql = require('mysql');
const port = 3000;

//start app and check conexion to the db
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'universidad'
});

try {
    connection.connect();
    console.log('¡successful connection!');
    app.listen(port, () => {
        console.log("listening in "+port)
    })
} catch (error) {
    console.error('An error has occurred while connecting to the database : ' + error.stack);
} finally {
    connection.end();
}
