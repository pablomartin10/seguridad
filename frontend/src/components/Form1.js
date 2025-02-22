import React, { useState } from 'react';
import axios from 'axios';

const Form1 = () => {
    const [formData, setFormData] = useState({
        campo1: '',
        campo2: '',
        archivo: null
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = new FormData();
        data.append('nombre_formulario', 'Formulario 1');
        data.append('campo1', formData.campo1);
        data.append('campo2', formData.campo2);
        data.append('archivo', formData.archivo);

        try {
            const response = await axios.post('http://localhost:5000/api/upload', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert(response.data.message);
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            alert('Error al enviar el formulario');
        }
    };

    return (
        <div className="form-container">
            <h2>Formulario 1</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Campo 1"
                    value={formData.campo1}
                    onChange={(e) => setFormData({...formData, campo1: e.target.value})}
                />
                <input
                    type="text"
                    placeholder="Campo 2"
                    value={formData.campo2}
                    onChange={(e) => setFormData({...formData, campo2: e.target.value})}
                />
                <input
                    type="file"
                    onChange={(e) => setFormData({...formData, archivo: e.target.files[0]})}
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default Form1;