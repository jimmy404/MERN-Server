const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {

        //revisamos si hay errores
        const errores = validationResult(req);
        if(!errores.isEmpty()){
            return res.status(400).json({errores: errores.array()})
        }

        //extraer email & pass
        const {email, password} = req.body;
        try {
            //revisar usuario reg
            let usuario = await Usuario.findOne({email});
            if(!usuario){
                return res.status(400).json({msg: 'El usuario no existe'})
            }

            //revisar pass
            const passCorrecto = await bcryptjs.compare(password, usuario.password);
            if(!passCorrecto){
                return res.status(400).json({msg: 'Password Incorrecto'})
            }

            //todo ok, crear y firmar token

        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        //firmar JWT
        jwt.sign(payload, process.env.SECRETA,{
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;
            //mensaje de confirmacion
            res.json({token});
        });

        } catch (error) {
            console.log(error);
        }

}

//obtiene que usuario esta autenticado
exports.usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id);
        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error'});
    }
}