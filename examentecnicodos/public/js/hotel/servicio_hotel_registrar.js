/*
Responsabilidades del servicio
    - Procesamiento de datos (cálculos)
    - Almacenamiento temporal de los datos
    - Comunicar el public (front-end) con el api (back-end)
*/

'use strict';

//variables globales--------------------------------


//funciones--------------------------------------
function registrarHotel(pHotel){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/registrar_hotel',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            nombre : pHotel[0],
            ubicacion : pHotel[1],
            provincia : pHotel[2],
            canton : pHotel[3],
            distrito : pHotel[4],
            direccion : pHotel[5],
            telefonoServicio : pHotel[6],
            correoServicio : pHotel[7],
            telefonoReservacion : pHotel[8],
            correoReservacion : pHotel[9]
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
}





