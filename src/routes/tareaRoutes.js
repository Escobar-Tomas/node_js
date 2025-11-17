const { Router } = require("express");
const router = Router();

const {
  lista_tareas,
  buscar_tarea_por_id,
  actualizar_tarea_por_id,
  insertar_tarea,
  eliminar_tarea_por_id,
} = require("../controllers/tareaController");

router.get("/api/tareas", lista_tareas);

router.get("/api/tareas/:id", buscar_tarea_por_id);

router.post("/api/tareas", insertar_tarea);

router.put("/api/tareas/:id", actualizar_tarea_por_id);

router.delete("/api/tareas/:id", eliminar_tarea_por_id);

module.exports = router;