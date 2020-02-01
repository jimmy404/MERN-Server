const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

//Crea nueva tarea

exports.crearTarea = async (req, res) => {

    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    //extraer proyecto y comprobar si existe
    const { proyecto } = req.body;

    try {
        const proyecto = await Proyecto.findById(proyecto);
        if(!proyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}