const express = require('express');

//crear el serv
const app = express();


// puerto de la app
const PORT = process.env.PORT || 4000;

//definir pag principal
app.get('/', (req, res) => {
    res.send('Hola Mundo')
});

//arrancar serv
app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en puerto ${PORT}`);
});