const app = require('./app');
const mysql = require('mysql');
const port = 3000;
require('dotenv').config();

const USER = process.env.USERDB;
const PASSWORD = process.env.PASSWORD;
const DBNAME = process.env.DBNAME
const HOST = process.env.HOST

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

//check date 15 20
//stablish reminder time [15,17,20]
//iterate 
//  notifyStudents(getHaventPaid)
//-----