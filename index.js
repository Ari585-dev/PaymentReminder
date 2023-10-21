const app = require('./app');
const mysql = require('mysql');
const port = 3000;
require('dotenv').config();

const USER = process.env.USERDB;
const PASSWORD = process.env.PASSWORD;
const DBNAME = process.env.DBNAME
const HOST = process.env.HOST

//start app and check conexion to the db
const connection = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DBNAME
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
