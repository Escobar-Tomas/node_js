const pool = require("../mysql");

const lista_tareas = async (req, res) => {
  try {
    // 1. Obtenemos el parámetro opcional 'id_proyecto' de la URL
    const { id_proyecto } = req.query;

    let sql = "SELECT * FROM tarea";
    const params = [];

    // 2. Si enviaron el ID, filtramos la consulta
    if (id_proyecto) {
      sql += " WHERE fk_proyecto = ?";
      params.push(id_proyecto);
    }

    sql += " ORDER BY fecha_creacion ASC";

    const [respuesta] = await pool.query(sql, params);

    // 3. Retornamos siempre un array (vacío o con datos) con estado 200
    // Esto evita errores en el frontend cuando un proyecto no tiene tareas aún.
    res.status(200).json(respuesta);

  } catch (error) {
    return res.status(500).json({ mensaje: "Error en el servidor", error: error.message });
  }
};

const buscar_tarea_por_id = async (req, res) => {
  try {
    const [respuesta] = await pool.execute("CALL buscar_tarea(?)", [
      req.params.id,
    ]);

    if (respuesta[0].length === 0) {
      return res.status(404).json({ mensaje: "No se encontró el registro" });
    }

    res.status(200).json(respuesta[0][0]);
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "Error en el servidor", error: error.message });
  }
};

const insertar_tarea = async (req, res) => {
  const {
    titulo,
    descripcion,
    id_proyecto,
    id_estado,
    fecha_inicio,
    fecha_fin,
  } = req.body;

  if (
    !titulo ||
    !descripcion ||
    !id_proyecto ||
    !id_estado ||
    !fecha_inicio ||
    !fecha_fin
  ) {
    return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
  }

  try {
    const [respuesta] = await pool.query(
      "CALL insertar_tarea(?, ?, ?, ?, ?, ?)",
      [titulo, descripcion, id_proyecto, id_estado, fecha_inicio, fecha_fin]
    );

    res
      .status(201)
      .json({ mensaje: "Tarea creada exitosamente", resultado: respuesta[0] });
  } catch (error) {
    console.error("Error al insertar tarea:", error);
    res.status(500).json({ mensaje: "Ocurrió un error al crear la tarea" });
  }
};

const actualizar_tarea_por_id = async (req, res) => {
  // AHORA leemos 'fk_estado' del cuerpo de la petición
  const { titulo, descripcion, id_proyecto, fk_estado, fecha_inicio, fecha_fin } = req.body;

  // Validamos usando fk_estado
  if (!titulo || !descripcion || !id_proyecto || !fk_estado || !fecha_inicio || !fecha_fin) {
    return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
  }

  try {
    const [respuesta] = await pool.query(
      "CALL actualizar_tarea(?, ?, ?, ?, ?, ?, ?)",
      [req.params.id, titulo, descripcion, id_proyecto, fk_estado, fecha_inicio, fecha_fin]
    );

    res.status(200).json({ mensaje: "Tarea actualizada exitosamente", resultado: respuesta[0] });
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
    res.status(500).json({ mensaje: "Ocurrió un error al actualizar la tarea" });
  }
};

const eliminar_tarea_por_id = async (req, res) => {
  try {
    const [respuesta] = await pool.query("CALL eliminar_tarea(?)", [
      req.params.id,
    ]);

    res
      .status(201)
      .json({
        mensaje: "Tarea eliminada exitosamente",
        resultado: respuesta[0],
      });
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    res.status(500).json({ mensaje: "Ocurrió un error al eliminar la tarea" });
  }
};

module.exports = {
  lista_tareas,
  buscar_tarea_por_id,
  actualizar_tarea_por_id,
  insertar_tarea,
  eliminar_tarea_por_id,
};