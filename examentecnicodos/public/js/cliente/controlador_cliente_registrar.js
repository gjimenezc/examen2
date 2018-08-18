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
const inputCedula = document.querySelector('#cedulaCliente');
const inputNombreUno = document.querySelector('#nombreCliente');
const inputNombreDos = document.querySelector('#nombreDosCliente');
const inputApellidoUno = document.querySelector('#apellidoCliente');
const inputApellidoDos = document.querySelector('#apellidoDosCliente');
const inputNacimiento = document.querySelector('#nacimientoCliente');
const selectSexo = document.querySelector('#sexoCliente');
const inputCorreo = document.querySelector('#correoCliente');
const inputContrasenna = document.querySelector('#contrasennaCliente');
const inputConfirmacion = document.querySelector('#confirmacionCliente');

//listeners---------------------------------------------------
btnGuardarCliente.addEventListener('click',function(){

    obtenerDatos();
    
});

//loads------------------------------------------------------
window.onload = function(){
    
};

//funciones-------------------------------------------------
function obtenerDatos(){
    let infoCliente =[];
    let bError = false;

    let sCedula = inputCedula.value;
    let sNombreUno = inputNombreUno.value;
    let sNombreDos = inputNombreDos.value;
    let sApellidoUno = inputApellidoUno.value;
    let sApellidoDos = inputApellidoDos.value;
    let dNacimiento = inputNacimiento.value;
    let sSexo = selectSexo.value;
    let iCliente = imagenUrl;
    let sCorreo = inputCorreo.value;
    let sContrasenna = inputContrasenna.value;
    
    infoCliente.push(sCedula,sNombreUno,sNombreDos,sApellidoUno,sApellidoDos,dNacimiento,sSexo,iCliente,sCorreo,sContrasenna);
    
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
        registrarCliente(infoCliente);
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
  
    return bError;
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


