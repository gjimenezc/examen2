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



let imagenUrl = '';
$(function() {
    // Configure Cloudinary
    // with credentials available on
    // your Cloudinary account dashboard
    $.cloudinary.config({ cloud_name: 'gjimenezc', api_key: '831884749841936'});

    // Upload button
    let uploadButton = $('#btnSubirFoto');

    // Upload button event
    uploadButton.on('click', function(e){
        // Initiate upload
        cloudinary.openUploadWidget({ cloud_name: 'gjimenezc', upload_preset: 'examen_1', tags: ['tagPokemon']},
        function(error, result) {
            if(error) console.log(error);
            // If NO error, log image data to console
            let id = result[0].public_id;
             console.log(id);
            imagenUrl = 'https://res.cloudinary.com/gjimenezc/image/upload/' + id;
            // imagenUrl = processImage(id);
            console.log(imagenUrl);
            document.querySelector('#fotoCliente').src = imagenUrl;
            return imagenUrl;
        });
    });
})

function processImage(id) {
    let options = {
        client_hints: true,
    };
    return  $.cloudinary.url(id, options);
}




