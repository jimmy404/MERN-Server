const express = require('express');
const conectarDB = require('./config/db');

//crear el serv
const app = express();

//conectar a base de datos
conectarDB();

//Habilitando express.json
app.use(express.json({extended: true}));

// puerto de la app
const PORT = process.env.PORT || 4000;

//importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));


//arrancar serv
app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en puerto ${PORT}`);
});