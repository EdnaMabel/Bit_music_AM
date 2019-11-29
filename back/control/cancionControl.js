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
    var generoCancion = parametros.genero;
    var artistaCancion = parametros.artista;
    

    Cancion.findOne({titulo: tituloCancion.toLowerCase()},(err,cancionCreada)=>{
        if (err) {
            res.status(500).send({
                message: "Error en el servidor"

            });

        } else {
            if (!cancionCreada) {
                res.status(404).send({
                    message: "Canción no encontrada"
                });
            } else {
                res.status(200).send({
                    cancion: cancionCreada
                });
            }
        }
    });
   

}

function buscarTodasCanciones(req, res) {
    var parametros = req.body;

    var tituloCanciones = parametros.titulo;
    

    Canciones.findOne({titulo: tituloCanciones.toLowerCase()},(err,cancionesCreadas)=>{
        if (err) {
            res.status(500).send({
                message: "Error en el servidor"

            });

        } else {
            if (!cancionesCreadas) {
                res.status(404).send({
                    message: "Canciones no encontradas"
                });
            } else {
                res.status(200).send({
                    canciones: cancionesCreadas
                });
            }
        }
    });
   

}

function actualizarCancion(req, res) {
    var parametros = req.body;

    var actualizarCancion = parametros.actualizar;
    

    Cancion.findOne({actualizar: actualizarCancion.toLowerCase()},(err,cancionActualizada)=>{
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
                    cancion: cancionesActualizada
                });
            }
        }
    });
   

}

function eliminarCancion(req, res) {
    var parametros = req.body;

    var eliminarCancion = parametros.eliminar;
    

    Cancion.findOne({eliminar: eliminarCancion.toLowerCase()},(err,cancionEliminada)=>{
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
                    cancion: cancionesEliminada
                });
            }
        }
    });
   

}






module.exports = {
    crearCancion,
    buscarCancion,
    buscarTodasCanciones,
    actualizarCancion,
    eliminarCancion

    
};
