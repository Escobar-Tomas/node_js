const { Router } = require('express');
const router = Router();
const { lista_areas } = require('../controllers/areaController');

router.get("/api/areas", lista_areas);

module.exports = router;