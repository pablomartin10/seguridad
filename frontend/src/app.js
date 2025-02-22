import React from 'react';
import FormGrid from './components/FormGrid';

const App = () => {
  const handleFormSelect = (form) => {
    console.log('Formulario seleccionado:', form);
    // Aquí puedes agregar la lógica de navegación o lo que necesites
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Seguridad y Salud
          </h1>
          <p className="text-center text-gray-600">
            Seleccione el formulario que desea completar
          </p>
        </header>
        
        <FormGrid onFormSelect={handleFormSelect} />
      </div>
    </div>
  );
};

export default App;