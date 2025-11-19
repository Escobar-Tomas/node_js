const express = require('express');
const morgan = require('morgan');
const cors = require("cors");

const PORT = 3000;

const rutas_de_tareas = require('./routes/tareaRoutes');
const rutas_de_proyectos = require('./routes/proyectoRoutes');
const rutas_de_areas = require('./routes/areaRoutes'); 
const rutas_de_usuarios = require('./routes/usuarioRoutes'); 

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use(rutas_de_tareas);
app.use(rutas_de_proyectos);
app.use(rutas_de_areas);
app.use(rutas_de_usuarios);

app.use((err, req, res, next) => {
    return res.json({ mensaje: err.message });
});

app.listen(PORT);
console.log(`Server is running on http://localhost:${PORT}`);