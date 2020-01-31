const Usuario = require('../models/Usuario');

exports.crearUsuario = async (req, res) => {

    //extraer email y pass
    const {email, password} = req.body;

    try {
        //revisar unico usuario
        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({msg: 'El usuario ya existe'})
        }

        //crea el nuevo usuario
        usuario = new Usuario(req.body);
        //guarda usuario
        await usuario.save();

        //mensaje de confirmacion
        res.json({msg: 'Usuario creado correctamente'})
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}