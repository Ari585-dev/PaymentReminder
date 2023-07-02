var mysql= require("mysql");
var conexion= mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'',
        database:'universidad'

    }
);
conexion.connect(
(err)=>{
    if(!err){

        console.log('Conexión establecida');
    }else{
        console.log('Error en la Conexión');

    }
}

);

module.exports=conexion;