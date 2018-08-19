/*
Responsabilidades del controlador
    - Leer datos de la interfaz
    - Imprimir datos dentro de la interfaz
    - Validar datos (formularios)
    - Responder a eventos (click, change, keyup...)
    - Se comunica con el servicio, cuando se requiera algún procesamiento de datos
*/

'use strict';

//variables globales------------------------------------------
const btnGuardarCliente = document.querySelector('#btnGuardar');
const btnEditarCliente = document.querySelector('#btnEditar');
const inputNombre = document.querySelector('#nombreHotel');
const selectProvincia = document.querySelector('#provinciaHotel');
const selectCanton = document.querySelector('#cantonHotel');
const selectDistrito = document.querySelector('#distritoHotel');
const inputDireccion = document.querySelector('#direccionHotel');
const inputTelServicio = document.querySelector('#telServicioHotel');
const inputCorreoServicio = document.querySelector('#correoServicioHotel');
const inputTelReservacion = document.querySelector('#telReservacionHotel');
const inputCorreoReservacion = document.querySelector('#correoReservacionHotel');
let idObjeto = obtenerId();

//listeners---------------------------------------------------

btnEditarCliente.addEventListener('click',function(){

    btnEditarCliente.classList.add('modificar');
    btnGuardarCliente.classList.remove('modificar');
    ftnHabilitarCampos();
    swal({
        type : 'success',
        title : 'Campos Habilitados',
        text: 'Modificar datos y dar click en botón \"Guardar\"',
        confirmButtonText : 'Entendido'
    });
    
});

btnGuardarCliente.addEventListener('click',function(){
    
    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
      })
      
      swalWithBootstrapButtons({
        title: 'Modificar hotel',
        text: "¿Deseas guardar los cambios realizados?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, guardar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {     
            obtenerDatos();
            
        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons(
            'Cancelado!',
            'Los cambios no fueron guardados',
            'error'
          )
            ftnMostrarObjeto(idObjeto,obtenerHoteles());
            ftnDeshabilitarCampos();
            ftnQuitarValidaciones();
            btnEditarCliente.classList.remove('modificar');
            btnGuardarCliente.classList.add('modificar');
        }
      })    
});

//loads------------------------------------------------------
window.onload = function(){

    let idObjeto = obtenerId();
    let listaDatos = obtenerHoteles();
    
    ftnMostrarObjeto(idObjeto,listaDatos);
    ftnDeshabilitarCampos();
};

//funciones-------------------------------------------------

function ftnMostrarObjeto (pId,pListaDatos){

    let objetoSeleccionado = null;

    pListaDatos.forEach(element => {
        if (element._id == pId) {
            objetoSeleccionado = element;
        }
    });

    inputNombre.value = objetoSeleccionado.nombre;
    selectProvincia.value = objetoSeleccionado.provincia;
    selectCanton.value = objetoSeleccionado.canton;
    selectDistrito.value = objetoSeleccionado.distrito;
    inputDireccion.value = objetoSeleccionado.direccion;
    inputTelServicio.value = objetoSeleccionado.telefonoServicio;
    inputCorreoServicio.src = objetoSeleccionado.correoServicio;
    inputTelReservacion.value = objetoSeleccionado.telefonoReservacion;
    inputCorreoReservacion.value = objetoSeleccionado.correoReservacion;
    let cordenadasMapa = JSON.parse(objetoSeleccionado.ubicacion);
        showMapForUpdate(cordenadasMapa.latitud, cordenadasMapa.longitud);

   
};

function ftnDeshabilitarCampos (){

    inputNombre.setAttribute('disabled',true);
    selectProvincia.setAttribute('disabled',true);
    selectCanton.setAttribute('disabled',true);
    selectDistrito.setAttribute('disabled',true);
    inputDireccion.setAttribute('disabled',true);
    inputTelServicio.setAttribute('disabled',true);
    inputCorreoServicio.setAttribute('disabled',true);
    inputTelReservacion.setAttribute('disabled',true);
    inputCorreoReservacion.setAttribute('disabled',true);

};

function obtenerId() {

    return JSON.parse(sessionStorage.getItem("idFilaSeleccionado"));
 }; 

function ftnFomatoFecha (pFecha){
    let fecha = new Date(pFecha);
    let dd = fecha.getDate()+1;
    let mm = fecha.getMonth()+1;
    let yyyy = fecha.getFullYear();
    let textoFecha = null;

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
    mm = '0'+mm
    } 

    textoFecha = yyyy + "-" + mm + "-" + dd;
  
    return textoFecha;
};

function obtenerDatos(){
    let infoHotel =[];
    let bError = false;

    let sNombre = inputNombre.value;
    let sProvincia = selectProvincia.value;
    let sCanton = selectCanton.value;
    let sDistrito = selectDistrito.value;
    let sDireccion = inputDireccion.value;
    let sTelServicio = inputTelServicio.value;
    let sCorreoServicio = inputCorreoServicio.value;
    let sTelReservacion = inputTelReservacion.value;
    let sCorreoReservacion = inputCorreoReservacion.value;
    let sUbicacion = JSON.stringify({latitud: marker.getPosition().lat(), longitud: marker.getPosition().lng()});
    
    infoHotel.push(sNombre,sUbicacion,sProvincia,sCanton,sDistrito,sDireccion,sTelServicio,sCorreoServicio,sTelReservacion,sCorreoReservacion);
    
    bError = validar();
    if(bError == true){
        swal({
            type : 'warning',
            title : 'No se pudo registrar el cliente',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText : 'Entendido'
        }).then( 
            function(){
                ftnQuitarValidacionesClick();   
            }   
        );
        console.log('No se pudo registrar el cliente');
    }else{
        registrarHotel(infoHotel);
        swal({
            type : 'success',
            title : 'Registro exitoso',
            text: 'El cliente se registró adecuadamente',
            confirmButtonText : 'Entendido'
        }).then(
            function(){
                window.location.href = "../../html/proyecto/proyecto_listar_admin.html" //falta
            }
        );
    }

    return bError;
};

function validar(){
    let bError = false;

    let regexSoloLetras = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ]+$/;
    let regexSoloNumeros = /^[0-9]+$/;
    let regexLetrasNumeros = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ 0-9]+$/;
    let regexFormatoCorreo = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    
     //Validación nombre
     if(inputNombre.value == '' && (regexSoloLetras.test(inputNombre.value)==false) ){
        inputNombre.classList.add('error-input');
        bError = true;
    }else{
        inputNombre.classList.remove('error-input');
    }

     //Validación provincia
     if(selectProvincia.value == 'defecto'){
        selectProvincia.classList.add('error-input');
        bError = true;
    }else{
        selectProvincia.classList.remove('error-input');
    }

     //Validación canton
     if(selectCanton.value == 'defecto'){
        selectCanton.classList.add('error-input');
        bError = true;
    }else{
        selectCanton.classList.remove('error-input');
    }

     //Validación distrito
     if(selectDistrito.value == 'defecto'){
        selectDistrito.classList.add('error-input');
        bError = true;
    }else{
        selectDistrito.classList.remove('error-input');
    }

     //Validación direccion
     if(inputDireccion.value == '' ){
        inputDireccion.classList.add('error-input');
        bError = true;
    }else{
        inputDireccion.classList.remove('error-input');
    }

    //Validación de tel servicio
       if(inputTelServicio.value == ''){
        inputTelServicio.classList.add('error-input');
        bError = true;
    }else{
        inputTelServicio.classList.remove('error-input');
    }

    //Validación correo servicio
    if(inputCorreoServicio.value == '' && (regexFormatoCorreo.test(inputCorreoServicio.value)==false)){
        inputCorreoServicio.classList.add('error-input');
        bError = true;
    }else{
        inputCorreoServicio.classList.remove('error-input');
    }
    
    //Validación tel reservacion
    if(inputTelReservacion.value == '' ){
        inputTelReservacion.classList.add('error-input');
        bError = true;
    }else{
        inputTelReservacion.classList.remove('error-input');
    }

    //Validación correo reservacion
    if(inputCorreoReservacion.value == '' && (regexFormatoCorreo.test(inputCorreoReservacion.value)==false)){
        inputCorreoReservacion.classList.add('error-input');
        bError = true;
    }else{
        inputCorreoReservacion.classList.remove('error-input');
    }
  
    return bError;
};


function ftnHabilitarCampos (){

    inputNombre.setAttribute('disabled',false);
    selectProvincia.setAttribute('disabled',false);
    selectCanton.setAttribute('disabled',false);
    selectDistrito.setAttribute('disabled',false);
    inputDireccion.setAttribute('disabled',false);
    inputTelServicio.setAttribute('disabled',false);
    inputCorreoServicio.setAttribute('disabled',false);
    inputTelReservacion.setAttribute('disabled',false);
    inputCorreoReservacion.setAttribute('disabled',false);
   
};

function ftnQuitarValidacionesClick (){

    let tiposInputs = ['input','select','textarea'];
    let inputsFormulario = [];
    let inputsRequest = null;
    let inputSeleccionado = null;

    for (let i = 0; i < tiposInputs.length; i++) {    
        
        inputsRequest = document.getElementsByTagName(tiposInputs[i]);

        if(inputsRequest == undefined || inputsRequest == ''){
            continue;
        } else {
            
            inputsFormulario.push(inputsRequest);
            
        }  
    }

    for (let i = 0; i < inputsFormulario.length; i++) {
        inputSeleccionado = inputsFormulario[i]

        for (let j = 0; j < inputSeleccionado.length; j++) {
            
            inputSeleccionado[j].addEventListener('click', function(){
                this.classList.remove('error-input');
            });   
            
        }        
    }
};

function ftnQuitarValidaciones (){

    let tiposInputs = ['input','select','textarea'];
    let inputsFormulario = [];
    let inputsRequest = null;
    let inputSeleccionado = null;

    for (let i = 0; i < tiposInputs.length; i++) {    
        
        inputsRequest = document.getElementsByTagName(tiposInputs[i]);

        if(inputsRequest == undefined || inputsRequest == ''){
            continue;
        } else {
            
            inputsFormulario.push(inputsRequest);
            
        }  
    }

    for (let i = 0; i < inputsFormulario.length; i++) {
        inputSeleccionado = inputsFormulario[i]

        for (let j = 0; j < inputSeleccionado.length; j++) {
            
            inputSeleccionado[j].classList.remove('error-input');
            
        }        
    }
};