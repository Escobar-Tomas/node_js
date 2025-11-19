const { Router } = require('express');
const router = Router();
const { lista_usuarios } = require('../controllers/usuarioController');

router.get("/api/usuarios", lista_usuarios);
module.exports = router;