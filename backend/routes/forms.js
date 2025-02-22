const express = require('express');
const router = express.Router();

// Lista de formularios
router.get('/', (req, res) => {
    const forms = [
        { id: 1, name: 'Formulario 1', image: 'form1.jpg' },
        { id: 2, name: 'Formulario 2', image: 'form2.jpg' },
        // Agregar más formularios
    ];
    res.json(forms);
});

module.exports = router;