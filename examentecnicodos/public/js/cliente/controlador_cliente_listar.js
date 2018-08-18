
'use srticit';

// variables globales----------------------------------------
const inputBusqueda = document.querySelector('#inputBusqueda');
const tablaCliente = document.querySelector('#tblCliente');

//listeners--------------------------------------------------
inputBusqueda.addEventListener('keyup' , function(){ftnFiltrarListaClientes()});

//loads------------------------------------------------------
window.onload = function(){
    ListarClientes();
};


//funciones--------------------------------------------------
function ListarClientes(){
    let listaClientes = obtenerListaClientes();
    let tbody = document.querySelector('#tblCliente tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < listaClientes.length; i++){
                
            let fila = tbody.insertRow();
            let celdaFoto = fila.insertCell();
            let celdaCedula = fila.insertCell();
            let celdaNombre = fila.insertCell();
            let celdaApellidos = fila.insertCell();
            let celdaSexo = fila.insertCell();
            let btns = fila.insertCell();

            let imgCliente = document.createElement('img');
            imgCliente.classList.add('img-tabla')
            imgCliente.setAttribute('src',listaClientes[i]['foto']);
            imgCliente.setAttribute('alt','Foto del cliente');

            let btnVer = document.createElement('a');
            btnVer.name = listaClientes[i]['_id'];
            btnVer.classList.add('fas');
            btnVer.classList.add('fa-eye');
            btnVer.addEventListener('click', ftnMostrarCliente);

            let btnEliminar = document.createElement('a');
            btnEliminar.name = listaClientes[i]['_id'];
            btnEliminar.classList.add('fas');
            btnEliminar.classList.add('fa-trash');
            btnEliminar.addEventListener('click', ftnEliminarCliente);

            celdaFoto.appendChild(imgCliente);
            celdaCedula.innerHTML = listaClientes[i]['cedula'];
            celdaNombre.innerHTML = listaClientes[i]['primerNombre'] + " " + listaClientes[i]['segundoNombre'];
            celdaApellidos.innerHTML = listaClientes[i]['primerApellido'] + " " + listaClientes[i]['segundoApellido'];
            celdaSexo.innerHTML = listaClientes[i]['sexo'];
            btns.appendChild(btnVer);
            btns.appendChild(btnEliminar);
    }

};

function ftnMostrarCliente(){
    let id = this.name;

    ftnGuardarIdSeleccionado(id);

    window.location.replace('../../html/proyecto/proyecto_mostrar_admin.html');
};

function ftnGuardarIdSeleccionado (pId){

    sessionStorage.setItem("idFilaSeleccionado", JSON.stringify(pId));
};

function ftnEliminarCliente(){
	let cliente = [this.name,true];
    
    
    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
      })
      
      swalWithBootstrapButtons({
        title: 'Eliminar cliente',
        text: "¿Deseas eliminar el cliente?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          swalWithBootstrapButtons(
            'Eliminado!',
            'Cliente ha sido eliminado',
            'success'
          )

          borrarCliente(cliente);
          ListarClientes();
            
        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons(
            'Cancelado!',
            'El cliente no ha sido eliminado',
            'error'
          )
        }
      })
};

function  ftnFiltrarListaClientes (){

    let criterioBusqueda = inputBusqueda.value.toUpperCase();
    let filasCliente = tablaCliente.getElementsByTagName('tr');
    let datosFila = null;
    let datos = null;
    let valor = null;
    let coincide = false;

    for (let i = 1; i < filasCliente.length; i++) {    
        datosFila = filasCliente[i];
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

