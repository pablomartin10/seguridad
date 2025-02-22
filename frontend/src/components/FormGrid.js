import React, { useState } from 'react';
import axios from 'axios';

const FormGrid = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        // Añadir más campos según el formulario
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/forms/submit', formData);
            alert(response.data.message);
        } catch (error) {
            console.error(error);
            alert('Error al enviar el formulario');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Título"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <textarea
                placeholder="Descripción"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <button type="submit">Enviar</button>
        </form>
    );
};

export default FormGrid;