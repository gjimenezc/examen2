'use strict';
const clienteModel = require('./cliente.model');
const nodeMailer = require('nodemailer');
const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'proyecto.test.software@gmail.com',
        pass: '1proyectotestsoftware9'
    }
});




module.exports.registrar = function (req, res) {
    let nuevoCliente = new clienteModel({
        cedula : req.body.cedula,
        primerNombre : req.body.primerNombre,
        segundoNombre : req.body.segundoNombre,
        primerApellido : req.body.primerApellido,
        segundoApellido : req.body.segundoApellido,
        fechaNacimiento : req.body.fechaNacimiento,
        sexo : req.body.sexo,
        foto : req.body.foto,
        correo : req.body.correo,
        contrasenna : req.body.contrasenna,
        tipo : 1
    });

    nuevoCliente.save(function (error) {
        if (error) {
            res.json({ success: false, msg: 'No se pudo registrar el cliente, ocurrió el siguiente error' + error });
        } else {
            let mailOptions = {
                from: 'proyecto.test.software@gmail.com',
                to: nuevoCliente.correo,
                subject: 'Bievenido a Hoteles.com',
                html: `
                <html>
                <head>
                    <style>
                        .tituloPrincipal{
                            background: #6c5ce7;
                        }
                    </style>
                </head>
                <body>
                    <h1 class='tituloPrincipal'>Bienvenido ${nuevoCliente.primerNombre}</h1>
                    <p>Disfrute de nuestra aplicación el correo con el cual debe iniciar sesión es: ${nuevoCliente.correo}</p>
                </body>
            </html>
                        `
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            res.json({ success: true, msg: 'El cliente se registró con éxito' });
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


