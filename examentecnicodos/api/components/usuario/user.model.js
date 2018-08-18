'use strict';
let mongoose = require('mongoose');

let usuarioSchema = new mongoose.Schema({
    correo : {type : String, required : true},
    contrasenna : {type : String, required : true},
    tipo : {type : Number, required : true}
});

module.exports = mongoose.model('usuario', usuarioSchema); 