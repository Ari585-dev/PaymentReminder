module.exports={
    
    getAllStudents:function(connection,funcion){
        connection.query("SELECT * FROM students", funcion);
    
    },

    getAllStudentsWithoutPayment:function(connection, funcion){
        connection.query("SELECT * FROM students WHERE matricula = false", funcion);
    }

    /* insertar:function(connection,datos,archivos,funcion){
        connection.query("INSERT INTO discos ( nombre, imagen, requisitos) VALUES (?,?,?)",[datos.nombre, 
        archivos.filename, datos.requisitos],
         funcion);
    
    },
    
    retornaID:function(connection,id,funcion){
        connection.query("SELECT * FROM discos WHERE id=?",[id], funcion);
    
    },
    
    borrar:function(connection,id,funcion){
        connection.query("DELETE FROM discos WHERE id=?",[id],funcion);
    
    },
    actualizar:function(connection,datos,funcion){
        connection.query("UPDATE discos SET nombre=?, requisitos=? WHERE id=? ",[datos.nombre, datos.requisitos, datos.id], funcion);
    
    },
    actualizarimg:function(connection,datos,archivo,funcion){
        connection.query("UPDATE discos SET imagen=? WHERE id=? ",[archivo.filename, datos.id], funcion);
    
    }
     */
    
    }