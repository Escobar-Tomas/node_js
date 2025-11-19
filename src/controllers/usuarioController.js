const pool = require('../mysql');

const lista_usuarios = async (req, res) => {
    try {
        const [usuarios] = await pool.query("SELECT * FROM usuario");
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: "Error server" });
    }
};

module.exports = { lista_usuarios };