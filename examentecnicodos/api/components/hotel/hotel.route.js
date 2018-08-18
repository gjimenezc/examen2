'use strict';
const express = require('express');
const router = express.Router();
const hotel = require('./hotel.api');


router.route('/registrar_hotel')
    .post(function(req, res){
        hotel.registrar(req, res);
});

router.route('/listar_hotel')
    .get(function(req, res){
        hotel.listar(req, res);
});

router.route('/modificar_hotel')
    .post(function(req, res){
        hotel.modificar(req, res);
});

router.route('/desactivar_hotel')
    .post(function(req, res){
        hotel.desactivar(req, res);
});

router.route('/borrar_hotel')
    .post(function(req, res){
        hotel.borrar(req, res);
});

router.route('/agregar_calificacion')
    .post(function(req, res){
        hotel.agregar_calificacion(req, res);
});

module.exports = router;