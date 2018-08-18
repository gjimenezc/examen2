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
    correoReservacion : {type : String, required : true}
});

module.exports = mongoose.model('hotel', hotelSchema); 