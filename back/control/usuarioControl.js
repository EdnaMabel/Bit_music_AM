// Importando el modelo usuario para interactuar con el
const Usuario = require('../modelo/usuario');
//Modulo interno del nucleo de Node. File System->leer los archivos externos

const fs = require('fs');
//Modulo de path _interno de Node->evaluar y analizar la ruta de un archivo o de un parametro 
//localhost:4000/api/subir-imagen/:id --/archivos/usuarios/icon.jpg
const path = require('path');

// req - request - peticion / res - response - respuesta
function crearUsuario(req, res){
    // instanciar - usar el objeto modelo Usuario
    var usuario = new Usuario();
    // guardar el cuerpo de la peticion en una variable
    // para mejor acceso a los datos que el usuario está enviando
    var parametros = req.body;

    // Para mayor organización de código vamos a guardar cada propiedad
    // del cuerpo de la petición en la variable usuario
    usuario.nombre = parametros.nombre;
    usuario.apellido = parametros.apellido;
    usuario.correo = parametros.correo;
    usuario.contrasena = parametros.contrasena;
    usuario.rol = 'usuario';
    usuario.imagen = null;

    usuario.save((err, usuarioCreado)=>{
        if(err){
            // estado de la respuesta del servidor
            // 500 -> errores propios del servidor
            res.status(500).send({
                message: "Error en el servidor :´("
            });
        } else{
            if(!usuarioCreado){
                // 404 -> Página no encontrada 
                res.status(404).send({
                    message: "No se pudo crear el usuario"
                });
            } else{
                // 200 -> OK
                res.status(200).send({
                    // modelo Usuario : Nuevo Usuario que se va a guardar
                    usuario: usuarioCreado
                });
            }
        }
    });
}

function login(req, res){
    var parametros = req.body;
    var correoUsuario = parametros.correo;
    var contraUsuario = parametros.contrasena;

    // Buscamos al usuario a través del correo. Usamos toLowerCase() para evitar problemas de datos
    Usuario.findOne({correo: correoUsuario.toLowerCase()}, (err, usuarioLogueado)=>{
        if(err){
            res.status(500).send({
                message: "Error en el servidor!!"
            });
        }else {
            if(!usuarioLogueado){
                res.status(404).send({
                    message: "No has podido iniciar sesión. Verifica que tus datos sean correctos"
                });
            }else{
                if(usuarioLogueado.contrasena != contraUsuario){
                    res.status(404).send({
                        message: "Contraseña incorrecta!"
                    });
                } else{
                    res.status(200).send({
                        usuario: usuarioLogueado
                    });
                }
            }
        }
    });
}

function actualizarUsuario(req, res){
    var usuarioId = req.params.id;
    var datosUsuarioActualizar = req.body;

    // db.coleccion.findByIdAndUpdate('a quien quiero actualizar', 'que campos / datos vas a modificar')
    Usuario.findByIdAndUpdate(usuarioId, datosUsuarioActualizar, (err, usuarioActualizado)=>{
        if(err){
            res.status(500).send({
                message: "Error en el servidor"
            });
        }else{
            if(!usuarioActualizado){
                res.status(404).send({
                    message: "No se pudo actualizar"
                });
            } else{
                res.status(200).send({
                    usuario: usuarioActualizado
                });
            }
        }
    });
} 

//nueva linea de codigo -> funcion subir imagen
function subirImg(req, res){
 var usuarioId = req.params.id;
 var nombreArchivo = "No ha subido nada..";


 //re.files -> el campo o propiedad files de
 // la peticion  guarda los archivos que el usuario esta enviando
 if(req.files){
     // var rutaArchivo =imagen: /archivos/usuarios/mi-imagen.jpg
     var rutaArchivo = req.files.imagen.path;
     console.log(rutaArchivo);
      

     //bit.jpg -> split(.)=['bit','jpg']
     //ctrl + alt +? -> colocar backslashe \\
     //altgr +|
     var partirArchivo = rutaArchivo.split('\\'); //permite partir una cadena desde un caracter
     console.log('variable partirArchivo: ' + partirArchivo);

     var nombreArchivo = partirArchivo[2];
     console.log('variable nombreArchivo: ' + nombreArchivo);


     var extensionImg = nombreArchivo.split('\.');//['mi-imagen', 'jpg']
     console.log('variable extensionImg:' + extensionImg);

     var extensionArchivo =extensionImg[1];//->.jpg
       console.log('variable extensionArchivo: '+ extensionArchivo);
       
       
       //validamos si el archivo es de un formato de imagen valido como png o jpg
    //1 verdadera o la segunda es falsa el resultado es verdadero, por que se cumple una de las dos condiciones.
       // si la primera y segunda es verdadera  inrgesara
       // si las primera y segunda condicion no se cumple  entonces  el resultado sera falso.  
/*
a traves de una expresion regular podemos validar si dentro de un acadenas
existe algun caracter en especifico. En este ejemplo validamos si al final 
de la cadena existe los caracteres jpg, png, gif, jpeg
Abrimos  una expresion regular con /patron/
 ^ - con el sombrerito indicamos que una cadena empiece  por x caracter
 ej: /^bar/--barco /bar/--barra
 $ con el signo dolar indicamos que una cadena termina  en x caracter
 ej:/ar$/--mar/programar

       var validarExtension = /\.(png|jpg|gif|jpeg)$/
       if(extensionArchivo.match(validarExtension)){
           usuario.find...etc
       }
*/

    if(extensionArchivo == 'png' || extensionArchivo =='jpg'){
       Usuario.findByIdAndUpdate(usuarioId,{imagen: nombreArchivo},(err, imgUsuario)=>{
           if(err){
               res.status(500).send({
                   message: "Error en el servidor"
               });
           }else{
               if(!imgUsuario){
                   res.status(404).send({
                       message: "No se pudo subir la imagen"
                   });
               }else{
                   res.status(200).send({
                       imagen: nombreArchivo,
                       usuario: imgUsuario
                   });
               }

           }
       });
       }else{
           res.status(404).send({
               message: "Archivo inválido!- no es una imagen"
           });
       }


 }else{
     res.status(404).send({
         message: "No ha subido ninguna imagen"
     });

 }
}

function mostrarArchivo(req,res){
    //guardamos el nombre del archivo que estamos enviando en la url
    var archivo = req.params.imageFile; //req.params.id
    //varificamos la carpeta archivos/usuarios para encontrar el archivo
    var rutaArchivo = './archivos/usuarios'+archivo;

    //validamos si dentro de la cartepa archivos/usuarios existe el archivo
    //fs.exist('en donde quiere buscar'(existe o no)=>{})
    fs.exists(rutaArchivo, (exists)=>{
        if(exists){
            //sendFile ->propio del modulo FS
            //Aca enviamos la imagen o el archivo como respuesta
            res.sendFile(path.resolve(rutaArchivo));
        }else{
            res.status(404).send({
                message: "No existe la imagen"
            });
        }

    });

}
module.exports = {
    crearUsuario,
    login,
    actualizarUsuario,
    subirImg,
    mostrarArchivo
};
