const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

//Crea nueva tarea

exports.crearTarea = async (req, res) => {

    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }


    try {
        //extraer proyecto y comprobar si existe
        const { proyecto } = req.body;
        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        //revisar si el proyecto pertenece al usuario autenticado
        if( existeProyecto.creador.toString() !== req.usuario.id ){
            return res.status(401).json({msg: 'No autorizado'});
        }

        //creamos la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({tarea});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

//obtiene tareas por proyecto
exports.obtenerTareas = async (req, res) => {
    try {
        //extraer proyecto y comprobar si existe
        const { proyecto } = req.body;
        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        //revisar si el proyecto pertenece al usuario autenticado
        if( existeProyecto.creador.toString() !== req.usuario.id ){
            return res.status(401).json({msg: 'No autorizado'});
        }

        //obtener las tareas por proyecto
        const tareas = await Tarea.find({proyecto});
        res.json({tareas});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//actualizar tarea
exports.actualizarTarea = async (req, res) => {
    try {
        //extraer proyecto y comprobar si existe
        const { proyecto, nombre, estado } = req.body;

        //revisar si la terea existe o no
        const tareaExiste = await Tarea.findById(req.params.id);

        if(!tareaExiste){
            return res.status(404).json({msg: 'No existe esa tarea'});
        }

        //extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        //revisar si el proyecto pertenece al usuario autenticado
        if( existeProyecto.creador.toString() !== req.usuario.id ){
            return res.status(401).json({msg: 'No autorizado'});
        }


        //crear un objeto con la nueva informacion
        const nuevaTarea = {};
        if(nombre){
            nuevaTarea.nombre = nombre;
        }
        if(estado){
            nuevaTarea.estado = estado;
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}