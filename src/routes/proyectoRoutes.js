const { Router } = require('express');
const router = Router();

const {lista_proyectos} = require('../controllers/proyectoController');

router.get("/api/proyectos", lista_proyectos);

module.exports = router;