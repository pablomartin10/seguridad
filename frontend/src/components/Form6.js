import React, { useState } from 'react';
import axios from 'axios';

const Form6 = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [archivo, setArchivo] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        formData.append('archivo', archivo);

        try {
            const response = await axios.post('http://localhost:5000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert(response.data.message);
        } catch (error) {
            console.error(error);
            alert('Error al enviar el formulario');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Formulario 2</h2>
            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
            />
            <textarea
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
            />
            <input
                type="file"
                onChange={(e) => setArchivo(e.target.files[0])}
                required
            />
            <button type="submit">Enviar</button>
        </form>
    );
};

export default Form6;