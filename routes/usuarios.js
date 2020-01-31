//rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

//crear usuario - Define el middleware
// api/usuario - metodo post - express
router.post('/',
    usuarioController.crearUsuario
);

module.exports = router;