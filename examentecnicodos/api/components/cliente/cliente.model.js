'use strict';
let mongoose = require('mongoose');

let clienteSchema = new mongoose.Schema({
    cedula : {type : String, required : true},
    primerNombre : {type : String, required : true},
    segundoNombre : {type : String, required : false},
    primerApellido : {type : String, required : true},
    segundoApellido : {type : String, required : false},
    fechaNacimiento : {type : Date, required : true},
    sexo : {type : String, required : true},
    foto : {type : String, required : true},
    correo : {type : String, required : true},
    contrasenna : {type : String, required : true},
    tipo : {type : Number, required : true}
});

module.exports = mongoose.model('cliente', clienteSchema); 