'use strict';
const express = require('express');
const router = express.Router();
const usuario = require('./user.api');


router.route('/registrar_usuario')
    .post(function(req, res){
        usuario.registrar(req, res);
});

router.route('/listar_usuario')
    .get(function(req, res){
        usuario.listar(req, res);
});

router.route('/borrar_usuario')
    .post(function(req, res){
        usuario.borrar(req, res);
});

module.exports = router;