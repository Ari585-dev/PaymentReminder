const app = require('./app');
const mysql = require('mysql');
const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'juegos'
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
