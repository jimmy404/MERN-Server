const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

//crear el serv
const app = express();

//conectar a base de datos
conectarDB();

//habilitar CORS
app.use(cors());

//Habilitando express.json
app.use(express.json({extended: true}));

// puerto de la app
const PORT = process.env.PORT || 4000;

//importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));


//arrancar serv
app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en puerto ${PORT}`);
});