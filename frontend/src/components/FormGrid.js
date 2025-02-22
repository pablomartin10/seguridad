import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FormGrid = () => {
    const [forms, setForms] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/forms')
            .then(response => setForms(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="grid-container">
            {forms.map(form => (
                <a key={form.id} href={`/form/${form.id}`} className="grid-item">
                    <img src={`/images/${form.image}`} alt={form.name} />
                    <p>{form.name}</p>
                </a>
            ))}
        </div>
    );
};

export default FormGrid;