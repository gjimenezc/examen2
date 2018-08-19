function autenticarCredenciales (correo, contrasenna){
    let listaUsuarios = getListaUsuarios();
    let valido = false;

    for (let i = 0; i < listaUsuarios.length; i++) {
        if (listaUsuarios[i]["correo"] == correo && listaUsuarios[i]["contrasenna"] == contrasenna) {
            valido = true;
            return valido;
        }
    }

    return valido;
};


function iniciarSesion(correo, contrasenna) {
    let listaUsuarios = getListaUsuarios();
    let valido = false;

    for (let i = 0; i < listaUsuarios.length; i++) {
        if (listaUsuarios[i]["correo"] == correo && listaUsuarios[i]["contrasenna"] == contrasenna) {
            setUsuarioSessionStorage(listaUsuarios[i]);
            valido = true;
            return valido;
        }
    }

    return valido;
}

function setUsuarioSessionStorage(infoUsuario) {
    console.log("Usuario Autenticado");
    console.log(infoUsuario);
    sessionStorage.setItem("UsuarioAutenticado", JSON.stringify(infoUsuario));
    console.log(JSON.parse(sessionStorage.getItem("UsuarioAutenticado")));
}

function removerCredenciales() {
    sessionStorage.clear();
}

function getUsuarioAutenticado() {
    return JSON.parse(sessionStorage.getItem("UsuarioAutenticado"));
}

