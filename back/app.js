/*
    Va a contener toda la lógica de ruteo de Express
    Declaración de rutas, uso de la librería body-parser
    Permisos de acceso a cualquier cliente (Permisos a Angular)
*/

const express = require('express'); // Importamos Express
const bodyParser = require('body-parser'); // Permite analizar datos de URL

const app = express(); // Application Express

// Configurar las rutas de acceso a cada función de nuestra aplicación
const usuarioRutas = require('./rutas/usuarioRutas');
const cancionRutas = require('./rutas/cancionRutas');
// Analizar los datos que se están enviando por la URL con body-parser
app.use(bodyParser.json());


// Configurar permisos de acceso a cualquier cliente
app.use((req, res, next)=>{
    //Todos estos permisos se envian por las cabeceras de las apliciones
    //Estos permisos deriban de AJAX (Asynchronous JavaScript, XHML)

    //Todos los dominios
    res.header('Access-Control -Allow-Origin', '*');
    //Todos los metadatos- cookies
    res.header('Access-Control -Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-with, Content-type, Accept, Access-Control-Allow-Request-Method');
    // Todos los metodos http: metodos de  peticion
    res.header('Access-Control-Allow-Methods', 'GET,POST, PUT, DELETE, OPTIONS');
    //Configuracion estricta de los metodos a  utilizar
    res.header('Allow', 'GET,POST, PUT, DELETE, OPTIONS');


    //app.use((req,res,next)=>{})Es un midleware
    //next() salga del midelware y ejecute el siguiente proceso o delo por terminado
    next();
});

// Consumo de las rutas
app.use('/api', usuarioRutas); // acá estamos usando todas las rutas del usuario que activan las funciones
// /api/registro
app.use('/api', cancionRutas);
module.exports = app; // Exportamos todo el archivo app
