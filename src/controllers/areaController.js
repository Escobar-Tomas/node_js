const pool = require('../mysql');

const lista_areas = async (req, res) => {
    try {
        const [respuesta] = await pool.query("SELECT * FROM area");
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener áreas" });
    }
};

module.exports = { lista_areas };