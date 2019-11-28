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

module.exports = {
    crearCancion
    
};
