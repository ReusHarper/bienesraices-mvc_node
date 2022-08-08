// Extraemos el paquete de express
// const express = require('express');  // Se implementa comun JSX
import express from "express"; // Se implementa ES modules
import csrf from "csurf";
import cookieParser from "cookie-parser";
import usuarioRoutes from "./routes/usuarioRoutes.js"
import db from "./config/db.js"

// Creacion de la app
const app = express();

// Habilitar lectura de la base de datos
app.use( express.urlencoded({extended: true}) );

// Habilitar Cookie Parser
app.use( cookieParser() );

// Habilitar CSRF
app.use( csrf({cookie: true}) );

// Conexión a la base de datos
try{
    await db.authenticate();
    db.sync();
    console.log('Conexión correcta a la base de datos');
} catch(error) {
    console.log(error);
}

// Habilitar Pug
app.set('view engine', 'pug');
app.set('views', './views');

// Carpeta pública
app.use(express.static('./public'));

// Routing
// get - Busca la ruta en especifico
// use - Busca todas las rutas que inicien con la cadena especificada (/)
app.use('/auth', usuarioRoutes);

// Definir un puerto y arrancar el proyecto
const port = 4000;

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});