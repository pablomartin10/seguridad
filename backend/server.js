const express = require('express');
const cors = require('cors');
const formsRouter = require('./routes/forms');
const uploadRouter = require('./routes/upload');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/forms', formsRouter);
app.use('/api/upload', uploadRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});