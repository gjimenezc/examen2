/*
Responsabilidades del servicio
    - Procesamiento de datos (cálculos)
    - Almacenamiento temporal de los datos
    - Comunicar el public (front-end) con el api (back-end)
*/

'use strict';

//variables globales--------------------------------


//funciones--------------------------------------
function registrarCliente(pCliente){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/registrar_cliente',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            cedula : pCliente[0],
            primerNombre : pCliente[1],
            segundoNombre : pCliente[2],
            primerApellido : pCliente[3],
            segundoApellido : pCliente[4],
            fechaNacimiento : pCliente[5],
            sexo : pCliente[6],
            foto : pCliente[7],
            correo : pCliente[8],
            contrasenna : pCliente[9]
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
}





