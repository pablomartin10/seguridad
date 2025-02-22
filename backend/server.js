const express = require('express');
const path = require('path');
const cors = require('cors');
const formsRouter = require('./routes/forms');
const uploadRouter = require('./routes/upload');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos del build de React (si estás sirviendo el frontend desde el backend)
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Ruta para la raíz
app.get('/', (req, res) => {
    res.send('Bienvenido al backend de Seguridad y Salud');
});

// Rutas de la API
app.use('/api/forms', formsRouter);
app.use('/api/upload', uploadRouter);

// Manejar todas las rutas y devolver el index.html (para React Router)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});