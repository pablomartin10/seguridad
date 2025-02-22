const express = require('express');
const router = express.Router();
const { Client } = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');

// Configuración de Microsoft Graph
const client = Client.init({
    authProvider: (done) => {
        done(null, process.env.SHAREPOINT_ACCESS_TOKEN);
    }
});

// Subir archivo a SharePoint
router.post('/', async (req, res) => {
    const { formName, file } = req.body;
    const folderName = formName.replace(/ /g, '_'); // Normalizar nombre de carpeta

    try {
        const response = await client
            .api(`/sites/TU_SITIO/drive/root:/${folderName}/${file.name}:/content`)
            .put(file);
        res.json({ success: true, response });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;