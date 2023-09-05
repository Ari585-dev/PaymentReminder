const app = require('./app');
const mysql = require('mysql');
const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'universidad'
});

try {
    connection.connect();
    console.log('¡CONEXIÓN EXITOSA!');
    app.listen(port, () => {
        console.log("listening in "+port)
    })
} catch (error) {
    console.error('Error al conectar a la base de datos: ' + error.stack);
} finally {
    connection.end();
}

//check date 15 20
//stablish reminder time [15,17,20]
//iterate 
//  notifyStudents(getHaventPaid)
//-----