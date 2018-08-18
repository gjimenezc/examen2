'use strict';
const hotelModel = require('./hotel.model');


module.exports.registrar = function(req, res){
    let nuevoHotel = new hotelModel({
        nombre : req.body.nombre,
        ubicacion : req.body.ubicacion,
        provincia : req.body.provincia,
        canton : req.body.canton,
        distrito : req.body.distrito,
        direccion : req.body.direccion,
        telefonoServicio : req.body.telefonoServicio,
        correoServicio : req.body.correoServicio,
        telefonoReservacion : req.body.telefonoReservacion,
        correoReservacion : req.body.correoReservacion,
        desactivado : false
    });

    nuevoHotel.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar al hotel, ocurrió el siguiente error' + error});
        }else{
            res.json({success : true, msg : 'El hotel se registro con éxito'});
        }

    });

};

module.exports.listar = function(req, res){
    hotelModel.find().then(
        function(hotel){
            res.send(hotel);
        });
};

module.exports.borrar = function (req, res) {
    hotelModel.findByIdAndDelete(req.body._id,
        function (err, user) {
            if (err) {
                res.json({ success: false, msg: 'No se ha borrado el hotel.' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'El hotel se ha eliminado correctamente.' + res });
            }
        });
};

module.exports.modificar = function (req, res) {
    hotelModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err, user) {
            if (err) {
                res.json({ success: false, msg: 'No se ha actualizado.' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
            }
        });
};

module.exports.agregar_calificacion = function (req, res) {

    hotelModel.update(
        { _id: req.body._id },
        {
            $push:
            {
                'calificacion':
                {
                    comida: req.body.comida,
                    servicio: req.body.servicio,
                    habitaciones: req.body.habitaciones,
                    infraestructura: req.body.infraestructura,
                    limpieza: req.body.limpieza
                }
            }
        },
        function (error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo registrar la calificación, ocurrió el siguiente error' + error });
            } else {
                res.json({ success: true, msg: 'La calificación se registró con éxito' });
            }
        }
    )
};


