const express = require('express');
const conectarDB = require('./config/db');

//crear el serv
const app = express();

//conectar a base de datos
conectarDB();

// puerto de la app
const PORT = process.env.PORT || 4000;


//arrancar serv
app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en puerto ${PORT}`);
});