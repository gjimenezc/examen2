
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
            let celdaEstado = fila.insertCell();
            let btns = fila.insertCell();

            let btnVer = document.createElement('a');
            btnVer.name = listaHotel[i]['_id'];
            btnVer.classList.add('fas');
            btnVer.classList.add('fa-eye');
            btnVer.addEventListener('click', ftnMostrarHotel);

            let btnEliminar = document.createElement('a');
            btnEliminar.name = listaHotel[i]['_id'];
            btnEliminar.classList.add('fas');
            btnEliminar.classList.add('fa-trash');
            btnEliminar.addEventListener('click', ftnEliminarHotel);

            celdaNombre.innerHTML = listaHotel[i]['nombre'];
            celdaProvincia.innerHTML = listaHotel[i]['provincia'];
            celdaCanton.innerHTML = listaHotel[i]['canton'];
            celdaDistrito.innerHTML = listaHotel[i]['distrito'];
            if(listaHotel[i]['desactivado']){
                celdaEstado.innerHTML = "Desactivado";

                let btnActivar = document.createElement('a');
                btnActivar.name = listaHotel[i]['_id'];
                btnActivar.classList.add('fas');
                btnActivar.classList.add('fa-plus-square');
                btnActivar.addEventListener('click', ftnActivarHotel);
                btns.appendChild(btnActivar);
            } else{
                celdaEstado.innerHTML = "Activado";

                let btnDesactivar = document.createElement('a');
                btnDesactivar.name = listaHotel[i]['_id'];
                btnDesactivar.classList.add('fas');
                btnDesactivar.classList.add('fa-minus-square');
                btnDesactivar.addEventListener('click', ftnDesactivarHotel);
                btns.appendChild(btnDesactivar);
            }
            btns.appendChild(btnVer);
            btns.appendChild(btnEliminar);
    }

};

function ftnMostrarHotel(){
    let id = this.name;

    ftnGuardarIdSeleccionado(id);

    window.location.replace('../../html/proyecto/proyecto_mostrar_admin.html');
};

function ftnGuardarIdSeleccionado (pId){

    sessionStorage.setItem("idFilaSeleccionado", JSON.stringify(pId));
};

function ftnEliminarHotel(){
	let hotel = this.name;
    
    
    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
      })
      
      swalWithBootstrapButtons({
        title: 'Eliminar hotel',
        text: "¿Deseas eliminar el hotel?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          swalWithBootstrapButtons(
            'Eliminado!',
            'Hotel ha sido eliminado',
            'success'
          )

          borrarHotel(hotel);
          ListarHoteles();
            
        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons(
            'Cancelado!',
            'El hotel no ha sido eliminado',
            'error'
          )
        }
      })
};

function ftnDesactivarHotel(){
	let hotel = [this.name,true];
    
    
    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
      })
      
      swalWithBootstrapButtons({
        title: 'Desactivar hotel',
        text: "¿Deseas desactivar el hotel?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, desactivar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          swalWithBootstrapButtons(
            'Desactivado!',
            'Hotel ha sido desactivado',
            'success'
          )

          desactivarHotel(hotel);
          ListarHoteles();
            
        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons(
            'Cancelado!',
            'El hotel no ha sido desactivado',
            'error'
          )
        }
      })
};

function ftnActivarHotel(){
	let hotel = [this.name,false];
    
    
    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
      })
      
      swalWithBootstrapButtons({
        title: 'Activar hotel',
        text: "¿Deseas activar el hotel?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, activar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          swalWithBootstrapButtons(
            'Activado!',
            'Hotel ha sido activado',
            'success'
          )

          desactivarHotel(hotel);
          ListarHoteles();
            
        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons(
            'Cancelado!',
            'El hotel no ha sido activado',
            'error'
          )
        }
      })
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

