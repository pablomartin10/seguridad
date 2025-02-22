const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const path = require('path');

// Ruta para recibir datos del formulario
router.post('/submit', (req, res) => {
    const formData = req.body;

    // Guardar los datos en un archivo temporal
    const filePath = path.join(__dirname, '../temp/form_data.json');
    require('fs').writeFileSync(filePath, JSON.stringify(formData));

    // Ejecutar el script de PowerShell para subir a SharePoint
    exec(`powershell -File ${path.join(__dirname, '../scripts/upload_to_sharepoint.ps1')}`, (error, stdout, stderr) => {
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