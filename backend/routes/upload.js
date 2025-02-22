const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { exec } = require('child_process');

// Configuración de Multer para manejar archivos adjuntos
const upload = multer({ dest: 'uploads/' });

// Ruta para recibir datos del formulario
router.post('/', upload.single('archivo'), (req, res) => {
    const { nombre, descripcion } = req.body;
    const archivo = req.file;

    // Guardar los datos en un archivo temporal
    const filePath = path.join(__dirname, '../temp/form_data.json');
    require('fs').writeFileSync(filePath, JSON.stringify({ nombre, descripcion, archivo }));

    // Ejecutar el script de Python para subir a SharePoint
    exec(`python3 ${path.join(__dirname, '../scripts/upload_to_sharepoint.py')}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({ success: false, error: error.message });
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return res.status(500).json({ success: false, error: stderr });
        }
        console.log(`Stdout: ${stdout}`);
        res.json({ success: true, message: 'Datos subidos a SharePoint' });
    });
});

module.exports = router;