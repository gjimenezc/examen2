'use strict';
const clienteModel = require('./cliente.model');


module.exports.registrar = function(req, res){
    let nuevoCliente = new clienteModel({
        cedula : req.body.cedula,
        primerNombre : req.body.primerNombre,
        segundoNombre : req.body.segundoNombre,
        primerApellido : req.body.primerApellido,
        segundoApellido : req.body.segundoApellido,
        fechaNacimiento : req.body.fechaNacimiento,
        sexo : req.body.sexo,
        foto : req.body.foto,
        contrasenna : req.body.contrasenna
    });

    nuevoCliente.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar al cliente, ocurrió el siguiente error' + error});
        }else{
            res.json({success : true, msg : 'El cliente se registro con éxito'});
        }

    });

};

module.exports.listar = function(req, res){
    clienteModel.find().then(
        function(cliente){
            res.send(cliente);
        });
};

module.exports.borrar = function (req, res) {
    clienteModel.findByIdAndDelete(req.body._id,
        function (err, user) {
            if (err) {
                res.json({ success: false, msg: 'No se ha borrado el cliente.' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'El cliente se ha eliminado correctamente.' + res });
            }
        });
};

module.exports.modificar = function (req, res) {
    clienteModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err, user) {
            if (err) {
                res.json({ success: false, msg: 'No se ha actualizado.' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
            }
        });
};


