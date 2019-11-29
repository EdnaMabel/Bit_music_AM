const express = require('express');
const CancionControl = require('../control/cancionControl');

var api = express.Router();
api.post('/registrar-cancion', CancionControl.crearCancion);
api.get('/obtener-cancion', CancionControl.buscarCancion);
api.get('/listar-canciones', CancionControl.buscarTodasCanciones);
api.put('/editar-cancion', CancionControl.actualizarCancion);
api.delete('/eliminar-cancion',CancionControl.eliminarCancion);


module.exports = api;
