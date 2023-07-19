const { promisify } = require('util');

module.exports={
    
    getAllStudents: function(connection) {
        return new Promise(function(resolve, reject) {
          connection.query("SELECT * FROM students", function(err, data) {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        });
      },
      
      getAllStudentsWithoutPayment: async function(connection) {
        const queryAsync = promisify(connection.query).bind(connection);
    
        try {
          const data = await queryAsync("SELECT * FROM students WHERE matricula = false");
          return data;
        } catch (err) {
          throw err;
        }
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