
'use strict';

function obtenerClientes(){
    let lista = [];

    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/listar_cliente',
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

function modificarCliente(pCliente){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/modificar_cliente',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : pCliente[0],
            cedula : pCliente[1],
            primerNombre : pCliente[2],
            segundoNombre : pCliente[3],
            primerApellido : pCliente[4],
            segundoApellido : pCliente[5],
            fechaNacimiento : pCliente[6],
            sexo : pCliente[7],
            foto : pCliente[8],
            correo : pCliente[9],
            contrasenna : pCliente[10]
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

