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
const inputCedula = document.querySelector('#cedulaCliente');
const inputNombreUno = document.querySelector('#nombreCliente');
const inputNombreDos = document.querySelector('#nombreDosCliente');
const inputApellidoUno = document.querySelector('#apellidoCliente');
const inputApellidoDos = document.querySelector('#apellidoDosCliente');
const inputNacimiento = document.querySelector('#nacimientoCliente');
const selectSexo = document.querySelector('#sexoCliente');
const imagenCliente = document.querySelector('#fotoCliente');
const inputCorreo = document.querySelector('#correoCliente');
const inputContrasenna = document.querySelector('#contrasennaCliente');
const inputConfirmacion = document.querySelector('#confirmacionCliente');
let idObjeto = getUsuarioAutenticado()._id;

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
        title: 'Modificar cliente',
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
            ftnMostrarObjeto(idObjeto,obtenerClientes());
            ftnDeshabilitarCampos();
            ftnQuitarValidaciones();
            btnEditarCliente.classList.remove('modificar');
            btnGuardarCliente.classList.add('modificar');
        }
      })    
});

//loads------------------------------------------------------
window.onload = function(){

    let listaDatos = obtenerClientes();
    
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

    inputCedula.value = objetoSeleccionado.cedula;
    inputNombreUno.value = objetoSeleccionado.primerNombre;
    inputNombreDos.value = objetoSeleccionado.segundoNombre;
    inputApellidoUno.value = objetoSeleccionado.primerApellido;
    inputApellidoDos.value = objetoSeleccionado.segundoApellido;
    inputNacimiento.value = ftnFomatoFecha(objetoSeleccionado.fechaNacimiento);
    selectSexo.value = objetoSeleccionado.sexo;
    imagenCliente.src = objetoSeleccionado.foto;
    inputCorreo.value = objetoSeleccionado.correo;
    inputContrasenna.value = objetoSeleccionado.contrasenna;
    inputConfirmacion.value = objetoSeleccionado.tipo;
   
};


function ftnDeshabilitarCampos (){

 inputCedula.setAttribute('disabled',true);
 inputNombreUno.setAttribute('disabled',true);
 inputNombreDos.setAttribute('disabled',true);
 inputApellidoUno.setAttribute('disabled',true);
 inputApellidoDos.setAttribute('disabled',true);
 inputNacimiento.setAttribute('disabled',true);
 selectSexo.setAttribute('disabled',true);
 imagenCliente.setAttribute('disabled',true);
 inputCorreo.setAttribute('disabled',true);
 inputContrasenna.setAttribute('disabled',true);
 inputConfirmacion.setAttribute('disabled',true);

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
    let infoCliente =[];
    let bError = false;

    let idObjeto = idObjeto;
    let sCedula = inputCedula.value;
    let sNombreUno = inputNombreUno.value;
    let sNombreDos = inputNombreDos.value;
    let sApellidoUno = inputApellidoUno.value;
    let sApellidoDos = inputApellidoDos.value;
    let dNacimiento = inputNacimiento.value;
    let sSexo = selectSexo.value;
    let iCliente = imagenCliente.src;
    let sCorreo = inputCorreo.value;
    let sContrasenna = inputContrasenna.value;
    
    infoCliente.push(idObjeto,sCedula,sNombreUno,sNombreDos,sApellidoUno,sApellidoDos,dNacimiento,sSexo,iCliente,sCorreo,sContrasenna);
    
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
        modificarCliente(infoCliente);
        swal({
            type : 'success',
            title : 'Registro exitoso',
            text: 'El cliente se registró adecuadamente',
            confirmButtonText : 'Entendido'
        }).then(
            function(){
                window.location.href = "../../html/cliente/cliente_listar.html" 
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

    
     //Validación cedula
     if(inputCedula.value == '' && (regexSoloNumeros.test(inputCedula.value)==false) ){
        inputCedula.classList.add('error-input');
        bError = true;
    }else{
        inputCedula.classList.remove('error-input');
    }
    
    //Validación nombre1
    if(inputNombreUno.value == '' && (regexSoloLetras.test(inputNombreUno.value)==false) ){
        inputNombreUno.classList.add('error-input');
        bError = true;
    }else{
        inputNombreUno.classList.remove('error-input');
    }

     //Validación nombre2
     if(inputNombreDos.value == '' && (regexSoloLetras.test(inputNombreDos.value)==false) ){
        inputNombreDos.classList.add('error-input');
        bError = true;
    }else{
        inputNombreDos.classList.remove('error-input');
    }

     //Validación apellido1
     if(inputApellidoUno.value == '' && (regexSoloLetras.test(inputApellidoUno.value)==false) ){
        inputApellidoUno.classList.add('error-input');
        bError = true;
    }else{
        inputApellidoUno.classList.remove('error-input');
    }

     //Validación apellido2
     if(inputApellidoDos.value == '' && (regexSoloLetras.test(inputApellidoDos.value)==false) ){
        inputApellidoDos.classList.add('error-input');
        bError = true;
    }else{
        inputApellidoDos.classList.remove('error-input');
    }

     //Validación nacimiento
     if(inputNacimiento.value == '' ){
        inputNacimiento.classList.add('error-input');
        bError = true;
    }else{
        inputNacimiento.classList.remove('error-input');
    }

    //Validación de sexo
       if(selectSexo.value == 'defecto'){
        selectSexo.classList.add('error-input');
        bError = true;
    }else{
        selectSexo.classList.remove('error-input');
    }

    //Validación foto
    if(imagenCliente.value == '' ){
        imagenCliente.classList.add('error-input');
        bError = true;
    }else{
        imagenCliente.classList.remove('error-input');
    }
    
    //Validación correo
    if(inputCorreo.value == '' && (regexFormatoCorreo.test(inputCorreo.value)==false)){
        inputCorreo.classList.add('error-input');
        bError = true;
    }else{
        inputCorreo.classList.remove('error-input');
    }

    //Validación contrasenna
    if(inputContrasenna.value == '' && inputContrasenna.value === inputConfirmacion.value  ){
        inputContrasenna.classList.add('error-input');
        bError = true;
    }else{
        inputContrasenna.classList.remove('error-input');
    }

    //Validación confirmación contrasenna
    if(inputConfirmacion.value == '' && inputConfirmacion.value === inputContrasenna.value  ){
        inputConfirmacion.classList.add('error-input');
        bError = true;
    }else{
        inputConfirmacion.classList.remove('error-input');
    }
  
    return bError;
};


function ftnHabilitarCampos (){

 inputCedula.setAttribute('disabled',false);
 inputNombreUno.setAttribute('disabled',false);
 inputNombreDos.setAttribute('disabled',false);
 inputApellidoUno.setAttribute('disabled',false);
 inputApellidoDos.setAttribute('disabled',false);
 inputNacimiento.setAttribute('disabled',false);
 selectSexo.setAttribute('disabled',false);
 imagenCliente.setAttribute('disabled',false);
 inputCorreo.setAttribute('disabled',false);
 inputContrasenna.setAttribute('disabled',false);
 inputConfirmacion.setAttribute('disabled',false);
   
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