const inicioSesion = document.querySelector('#btnIniciarSesion');
const regClientesAdministrador = document.querySelector('#btnRegistrarCliente');
const regClientesIndex = document.querySelector('#btnRegistrarClienteIndex');
const perfilCliente = document.querySelector('#btnRegistrarClienteDos');
const clientes = document.querySelector('#btnClientes');
const regHotel = document.querySelector('#btnRegistrarHotel');
const hotelesAdmin = document.querySelector('#btnHotelesAdministrador');
const hotelesCliente = document.querySelector('#btnHotelesCliente');

inicioSesion.addEventListener('click',function(){
    window.location.replace('../../html/general/iniciar_sesion.html');
});
regClientesAdministrador.addEventListener('click',function(){
    window.location.replace('../../html/cliente/cliente_registrar.html');
});
regClientesIndex.addEventListener('click',function(){
    window.location.replace('../../html/cliente/cliente_registrar_index.html');
});
perfilCliente.addEventListener('click',function(){
    window.location.replace('../../html/cliente/cliente_mostrar_cliente.html');
});
clientes.addEventListener('click',function(){
    window.location.replace('../../html/cliente/cliente_listar.html');
});
regHotel.addEventListener('click',function(){
    window.location.replace('../../html/hotel/hotel_registrar.html');
});
hotelesAdmin.addEventListener('click',function(){
    window.location.replace('../../html/hotel/hotel_listar.html');
});
hotelesCliente.addEventListener('click',function(){
    window.location.replace('../../html/hotel/hotel_listar_cliente.html');
});