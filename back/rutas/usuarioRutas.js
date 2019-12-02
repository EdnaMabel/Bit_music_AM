/* 
    Vamos a crear el manejador de rutas de express para nuestra aplicación
    (API).
    Este manejador se encargará de las rutas del lado del backend
*/
const express = require('express');
const UsuarioControl = require('../control/usuarioControl');

var api = express.Router(); // cargamos el manejador de rutas de Express

/*
    A través de las características de una API tenemos acceso
    a los métodos POST, GET, PUT y DELETE. Estos métodos nos van 
    a permitir Agregar datos (POST), obtener datos (GET),
    actualizar datos (PUT) y eliminar datos (DELETE). Estos métodos
    los provee el protocolo HTTP
*/


var multipart = require('connect-multiparty'); //permite leer los archivos multimedia
//uploadDir-> upload Directory- recibe como valor la carpeta donde se guardaran los archivos.
var subirImgDirectorio = multipart( {uploadDir: './archivos/usuarios'});

// Por cada función que vayamos a crear debe existir una ruta
// post('una ruta de acceso', una función a ejecutar)
api.post('/registro', UsuarioControl.crearUsuario);
// En el caso del login, en una API es un proceso especial y que no guarda los datos en BD
// sino que realiza un paneo o scan del modelo para la coincidencia de datos
api.post('/loginUsuario', UsuarioControl.login);
// PUT y DELETE es que necesitan tener especificados el id en la ruta
api.put('/actualizar-usuario/:id', UsuarioControl.actualizarUsuario);
//usaremos el metodo post para actualizar el dato imagen ya que con put nos a
//ctualizaria todo el registro agregando un campo de mas que no queremos
/*usuario con imagen actualizada desde metodo Put 
{
    "nombre":"pepe",
    "imagen":null,
    "imagen":"archivo.jpg"
_----------------------------------------
usuario con imagen actualizado desde metodo post
{"nombre":"pepe",
"imagen":"archivo.jpg"
} */

//Especificamos ('ruta', direccion de archivos, funcion a ejecutar )
api.put('/subir-imagen-usuario/:id',subirImgDirectorio, UsuarioControl.subirImg);
// ruta para mostrar la imagen del usuario
api.get('/obtener-imagen-usuario/:imageFile', UsuarioControl.mostrarArchivo);
module.exports = api ; // 
// MVW -> Modelo Vista Cualquiera / Model View Whatever (modelo, vista rutas)
// aplicaciones menos robustas

// MVC aplicaciones más robustas


