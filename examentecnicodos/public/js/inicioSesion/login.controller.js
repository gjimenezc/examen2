'use strict';
//Variables globales------------------------------------------
const btnIngresarUsuario = document.querySelector('#btnInicioSesion');
const aSalirUsuario = document.querySelector('#btnSalir');

//listeners--------------------------------------------------
if (btnIngresarUsuario != undefined) {
    btnIngresarUsuario.addEventListener('click' , function(){
        getCredencialesUsuario()
    });
}

aSalirUsuario.addEventListener('click' , function(){
    cerrarSesion()
});

//loads------------------------------------------------------

    ftnRevisionCredenciales();

//funciones-------------------------------------------------------

function obtenerUrl() {
    let paginaUrl = window.location.href;
    let valor = false;
    
    if(paginaUrl.includes("iniciar_sesion.html")){
        valor = true;
    }
 
    return valor;
 }; 

function ftnRevisionCredenciales (){

    if(obtenerUrl()){
        return;
    } else {
        let credenciales = getUsuarioAutenticado();
        
        if(credenciales == '' || credenciales == null){
            swal({
                type : 'warning',
                title : 'Sin credenciales',
                text: 'Por favor, iniciar sesión.',
                confirmButtonText : 'Entendido'
            }).then(
                function(){
                    window.location.replace('../../html/general/index.html');
                }
            );
        } else {
            if(autenticarCredenciales(credenciales.correo,credenciales.contrasenna)){
                // validarMenu();
                return;
            } else {
                swal({
                    type : 'warning',
                    title : 'Usuario Inválido',
                    text: 'Por favor, iniciar sesión con otro usuario.',
                    confirmButtonText : 'Entendido'
                }).then(
                    function(){
                        window.location.replace('../../html/general/index.html');
                    }
                );
            }
        }
    }
} ;
   
function getCredencialesUsuario() {
    let correo = document.querySelector("#txtCorreoInicio").value;
    let contrasenna = document.querySelector("#txtContrasennaInicio").value;

    let valido = validarCredenciales(correo, contrasenna);

    if (valido) {
        swal({
            type : 'success',
            title : 'Bienvenido',
            text: 'Acceso permitido',
            confirmButtonText : 'Entendido'}).then(
                function(){
                    console.log("Acceso permitido");
                    redireccionarUsuario();
                }
            );
    } else {
        swal({
            type : 'warning',
            title : 'Acceso denegado',
            text: 'Por favor revise el usuario y/o la clave que digitó',
            confirmButtonText : 'Entendido'
        });
        console.log("Acceso denegado");
    }
}

function validarCredenciales(correo, contrasenna) {
    let valido = iniciarSesion(correo, contrasenna);
    return valido;
}

function cerrarSesion() {
    removerCredenciales();
    window.location.replace('../../html/general/index.html');
}

function redireccionarUsuario() {
    let usuarioAutenticado = getUsuarioAutenticado();

    switch (usuarioAutenticado.tipo) {
        case 0:
            // acciones de administrador            
            window.location.replace('../../html/general/index_administrador.html');
            break;
        case 1:
            // acciones de cliente
            window.location.replace('../../html/general/index_cliente.html');
            break;                         
        default:
            break;
    }
}




