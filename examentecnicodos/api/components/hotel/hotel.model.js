'use strict';
let mongoose = require('mongoose');

let hotelSchema = new mongoose.Schema({
    nombre : {type : String, required : true},
    ubicacion : {type : String, required : true},
    provincia : {type : String, required : true},
    canton : {type : String, required : true},
    distrito : {type : String, required : true},
    direccion : {type : String, required : true},
    telefonoServicio : {type : String, required : true},
    correoServicio : {type : String, required : true},
    telefonoReservacion : {type : String, required : true},
    correoReservacion : {type : String, required : true},
    desactivado : {type : Boolean, required : true},
    calificacion : [
        {
            comida: {type: Number, required: false},
            servicio: {type: Number, required: false},
            habitaciones: {type: Number, required: false},
            infraestructura: {type: Number, required: false},
            limpieza: {type: Number, required: false}
        }
    ]
});

module.exports = mongoose.model('hotel', hotelSchema); 