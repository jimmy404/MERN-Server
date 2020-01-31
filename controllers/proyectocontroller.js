const Proyecto = require('../models/Proyecto');


exports.crearProyecto = async (req, res) => {
    try {
        //crear proyecto nuevo
        const proyecto = new Proyecto(req.body);
        proyecto.save();
        res.json(escape);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}