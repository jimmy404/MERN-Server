const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

//crear tarea
//api/tarea
router.post('/',
    auth,
    [
        check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
        check('proyecto', 'El Proyecto es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
);

//obtener las tareas por proyecto
router.get('/',
    auth,
    tareaController.obtenerTareas
)

//actualizando tareas

router.put('/:id',
    auth,
    tareaController.actualizarTarea
)


module.exports = router;