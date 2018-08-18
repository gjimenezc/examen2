'use strict';
const usuarioModel = require('./user.model');


module.exports.registrar = function(req, res){
    let nuevoUsuario = new usuarioModel({
        correo : req.body.correo,
        contrasenna : req.body.contrasenna,
        tipo : 0
    });

    nuevoUsuario.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar al usuario, ocurrió el siguiente error' + error});
        }else{
            res.json({success : true, msg : 'El usuario se registro con éxito'});
        }

    });

};

module.exports.listar = function(req, res){
    usuarioModel.find().then(
        function(usuario){
            res.send(usuario);
        });
};

module.exports.borrar = function (req, res) {
    usuarioModel.findByIdAndDelete(req.body._id,
        function (err, user) {
            if (err) {
                res.json({ success: false, msg: 'No se ha borrado el usuario.' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'El usuario se ha eliminado correctamente.' + res });
            }
        });
};



