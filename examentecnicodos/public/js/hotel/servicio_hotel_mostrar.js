
'use strict';

function obtenerHoteles(){
    let lista = [];

    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/listar_hotel',
        type : 'get',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
    
    return lista;
}

function modificarHotel(pHotel){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/registrar_hotel',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            nombre : pHotel[1],
            ubicacion : pHotel[2],
            provincia : pHotel[3],
            canton : pHotel[4],
            distrito : pHotel[5],
            direccion : pHotel[6],
            telefonoServicio : pHotel[7],
            correoServicio : pHotel[8],
            telefonoReservacion : pHotel[9],
            correoReservacion : pHotel[10]
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
}




