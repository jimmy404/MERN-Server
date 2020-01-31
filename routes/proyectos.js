const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectocontroller');


//crear proyecto
// api/proyectos
router.post('/',
    proyectoController.crearProyecto
)

module.exports = router;