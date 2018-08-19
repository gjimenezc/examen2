function getListaUsuarios() {
    let listaClientes = obtenerListaClientes();
    let listaAdmin = obtenerListaAdmin();
    let listaUsuarios = [];

    for (let i = 0; i < listaClientes.length; i++) {
        listaUsuarios.push(listaClientes[i]);
    }
 
    for (let i = 0; i < listaAdmin.length; i++) {
        listaUsuarios.push(listaAdmin[i]);
    }

    return listaUsuarios;
}

function obtenerListaClientes(){
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

function obtenerListaAdmin (){
    let lista = [];

    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/listar_usuario',
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

