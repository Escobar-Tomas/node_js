const pool = require('../mysql');

const lista_proyectos = async (req, res) => {
    try {
        const [respuesta] = await pool.query("SELECT * FROM proyecto ORDER BY fecha_inicio ASC");

        if(respuesta[0].length === 0){
            return res.status(404).json({ mensaje: "No se encontraron registros" });
        }

        res.status(200).json(respuesta);

    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor", error: error.message });
    }
};

module.exports = {
    lista_proyectos
}