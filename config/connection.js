//mysql connection file
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
            console.log('Conexión established');
        }else{
            console.log('Error in the conexion');
        }
    }
);

module.exports=conexion;