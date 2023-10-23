//mysql connection file
var mysql= require("mysql");
require('dotenv').config();

const USER = process.env.USERDB;
const PASSWORD = process.env.PASSWORD;
const DBNAME = process.env.DBNAME
const HOST = process.env.HOST

var conexion= mysql.createConnection(
    {
        host: HOST,
        user: USER,
        password: PASSWORD,
        database: DBNAME
    }
);

conexion.connect(
    (err)=>{
        if(!err){
            console.log('Connection established');
        }else{
            console.log('Error in the connection');
        }
    }
);

module.exports=conexion;