'use strict';
const express = require('express');
const router = express.Router();
const cliente = require('./cliente.api');


router.route('/registrar_cliente')
    .post(function(req, res){
        cliente.registrar(req, res);
});

router.route('/listar_cliente')
    .get(function(req, res){
        cliente.listar(req, res);
});

router.route('/modificar_cliente')
    .post(function(req, res){
        cliente.modificar(req, res);
});

router.route('/borrar_cliente')
    .post(function(req, res){
        cliente.borrar(req, res);
});

module.exports = router;