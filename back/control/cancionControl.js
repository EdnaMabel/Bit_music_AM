const Cancion = require('../modelo/cancion')
function crearCancion(req, res) {
    var cancion = new Cancion();

    var parametros = req.body;

    cancion.titulo = parametros.titulo;
    cancion.numero = parametros.numero;
    cancion.duracion = parametros.duracion;
    cancion.url = null;
    cancion.genero = parametros.genero;
    cancion.artista = parametros.artista;
    cancion.album = parametros.album;

    cancion.save((err, cancionNueva) => {
        if (err) {
            res.status(500).send({
                message: "Error en el servidor"

            });

        } else {
            if (!cancionNueva) {
                res.status(404).send({
                    message: "No fue posible crear la cancion"
                });
            } else {
                res.status(200).send({
                    cancion: cancionNueva
                });
            }
        }
    });

}

function buscarCancion(req, res) {
    var parametros = req.body;

    var tituloCancion = parametros.titulo;
    //var generoCancion = parametros.genero;
    //var artistaCancion = parametros.artista;
    

    Cancion.findOne({titulo: tituloCancion.toLowerCase()},(err,cancionEncontrada)=>{
        if (err) {
            res.status(500).send({
                message: "Error en el servidor"

            });

        } else {
            if (!cancionEncontrada) {
                res.status(404).send({
                    message: "Canción no encontrada"
                });
            } else {
                res.status(200).send({
                    cancion: cancionEncontrada
                });
            }
        }
    });
   

}

function buscarGenero(req, res) {
    var parametros = req.body;

    var generoCanciones = parametros.genero;
    

    Cancion.find({genero: generoCanciones.toLowerCase()},(err,cancionesEncontradas)=>{
        if (err) {
            res.status(500).send({
                message: "Error en el servidor"

            });

        } else {
            if (!cancionesEncontradas) {
                res.status(404).send({
                    message: "Canciones no encontradas"
                });
            } else {
                res.status(200).send({
                    canciones: cancionesEncontradas
                });
            }
        }
    });
   

}

function actualizarCancion(req, res) {

    var cancionId = req.params.id;
    var actualizarCancion = req.body;


    

    Cancion.findByIdAndUpdate(cancionId, actualizarCancion,(err,cancionActualizada)=>{
        if (err) {
            res.status(500).send({
                message: "Error en el servidor"

            });

        } else {
            if (!cancionActualizada) {
                res.status(404).send({
                    message: "Cancion NO actualizada"
                });
            } else {
                res.status(200).send({
                    cancion: cancionActualizada
                });
            }
        }
    });
   

}

function eliminarCancion(req, res) {
    var cancionId = req.params.id;
    

    Cancion.findByIdAndDelete(cancionId,(err,cancionEliminada)=>{
        if (err) {
            res.status(500).send({
                message: "Error en el servidor"

            });

        } else {
            if (!cancionEliminada) {
                res.status(404).send({
                    message: "Cancion NO Eliminada"
                });
            } else {
                res.status(200).send({
                    cancion: cancionEliminada
                });
            }
        }
    });
   

}






module.exports = {
    crearCancion,
    buscarCancion,
    buscarGenero,
    actualizarCancion,
    eliminarCancion

    
};
