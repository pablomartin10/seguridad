import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const FormGrid = ({ onFormSelect = () => {} }) => {
    const forms = [
        { id: 1, name: 'Formulario 1', image: 'form1.jpg', path: '/form1' },
        { id: 2, name: 'Formulario 2', image: 'form2.jpg', path: '/form2' },
        { id: 3, name: 'Formulario 3', image: 'form3.jpg', path: '/form3' },
        { id: 4, name: 'Formulario 4', image: 'form4.jpg', path: '/form4' },
        { id: 5, name: 'Formulario 5', image: 'form5.jpg', path: '/form5' },
        { id: 6, name: 'Formulario 6', image: 'form6.jpg', path: '/form6' }
    ];

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {forms.map(form => (
                    <div 
                        key={form.id}
                        onClick={() => onFormSelect(form)}
                        className="cursor-pointer transition-transform hover:scale-105"
                    >
                        <Card className="h-full">
                            <CardContent className="p-4">
                                <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                                    <img 
                                        src={`/images/${form.image}`} 
                                        alt={form.name}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <h3 className="text-lg font-semibold text-center">
                                    {form.name}
                                </h3>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FormGrid;