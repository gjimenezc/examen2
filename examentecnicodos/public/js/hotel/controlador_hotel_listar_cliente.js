
'use srticit';

// variables globales----------------------------------------
const inputBusqueda = document.querySelector('#inputBusqueda');
const tablaHotel = document.querySelector('#tblHotel');

//listeners--------------------------------------------------
inputBusqueda.addEventListener('keyup' , function(){ftnFiltrarListaHoteles()});

//loads------------------------------------------------------
window.onload = function(){
    ListarHoteles();
};


//funciones--------------------------------------------------
function ListarHoteles(){
    let listaHotel = obtenerListaHoteles();
    let tbody = document.querySelector('#tblHotel tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < listaHotel.length; i++){
                
            let fila = tbody.insertRow();
            let celdaNombre = fila.insertCell();
            let celdaProvincia = fila.insertCell();
            let celdaCanton = fila.insertCell();
            let celdaDistrito = fila.insertCell();
            let btns = fila.insertCell();

            let btnVer = document.createElement('a');
            btnVer.name = listaHotel[i]['_id'];
            btnVer.classList.add('fas');
            btnVer.classList.add('fa-eye');
            btnVer.addEventListener('click', ftnMostrarHotel);

            let btnCalificar = document.createElement('a');
            btnCalificar.name = listaHotel[i]['_id'];
            btnCalificar.classList.add('fas');
            btnCalificar.classList.add('fa-star');
            btnCalificar.addEventListener('click', ftnCalificarHotel);

            celdaNombre.innerHTML = listaHotel[i]['nombre'];
            celdaProvincia.innerHTML = listaHotel[i]['provincia'];
            celdaCanton.innerHTML = listaHotel[i]['canton'];
            celdaDistrito.innerHTML = listaHotel[i]['distrito'];
            btns.appendChild(btnVer);
            btns.appendChild(btnCalificar);
    }

};

function ftnMostrarHotel(){
    let id = this.name;

    ftnGuardarIdSeleccionado(id);

    window.location.replace('../../html/hotel/hotel_mostrar_cliente.html');
};

function ftnCalificarHotel(){
  let id = this.name;

  ftnGuardarIdSeleccionado(id);

  window.location.replace('../../html/proyecto/proyecto_mostrar_admin.html');
};

function ftnGuardarIdSeleccionado (pId){

    sessionStorage.setItem("idFilaSeleccionado", JSON.stringify(pId));
};

function  ftnFiltrarListaHoteles (){

    let criterioBusqueda = inputBusqueda.value.toUpperCase();
    let filasHotel = tablaHotel.getElementsByTagName('tr');
    let datosFila = null;
    let datos = null;
    let valor = null;
    let coincide = false;

    for (let i = 1; i < filasHotel.length; i++) {    
        datosFila = filasHotel[i];
        datos = datosFila.getElementsByTagName('td');
        coincide = false;

        for (let j = 0; j < datos.length-1; j++) {
            valor = datos[j].innerHTML.toUpperCase();

            if(valor.includes(criterioBusqueda)){
                coincide = true;
            } 
        }
        if(coincide){
            datosFila.classList.remove('esconder');
        } else {
            datosFila.classList.add('esconder');
        }
    }

   
};

