import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

const Form1 = () => {
    const [formData, setFormData] = useState({
        fecha: '',
        ubicacion: '',
        supervisor: '',
        tipoAndamio: '',
        altura: '',
        numeroNiveles: '',
        condicionEstructural: '',
        observaciones: '',
        imagenes: []
    });

    const [imagesPreviews, setImagesPreviews] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prev => ({
            ...prev,
            imagenes: [...prev.imagenes, ...files]
        }));

        // Crear previews de las imágenes
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagesPreviews(prev => [...prev, reader.result]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'imagenes') {
                formData[key].forEach(img => {
                    data.append('imagenes', img);
                });
            } else {
                data.append(key, formData[key]);
            }
        });

        try {
            const response = await fetch('http://localhost:5000/api/upload', {
                method: 'POST',
                body: data
            });
            
            if (response.ok) {
                alert('Inspección guardada exitosamente');
            } else {
                throw new Error('Error al guardar la inspección');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al enviar el formulario');
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        Inspección de Andamios
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="fecha">Fecha de Inspección</Label>
                                <Input
                                    id="fecha"
                                    type="date"
                                    value={formData.fecha}
                                    onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                                    required
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="ubicacion">Ubicación</Label>
                                <Input
                                    id="ubicacion"
                                    type="text"
                                    value={formData.ubicacion}
                                    onChange={(e) => setFormData({...formData, ubicacion: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="supervisor">Supervisor Responsable</Label>
                                <Input
                                    id="supervisor"
                                    type="text"
                                    value={formData.supervisor}
                                    onChange={(e) => setFormData({...formData, supervisor: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="tipoAndamio">Tipo de Andamio</Label>
                                <Input
                                    id="tipoAndamio"
                                    type="text"
                                    value={formData.tipoAndamio}
                                    onChange={(e) => setFormData({...formData, tipoAndamio: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="altura">Altura (metros)</Label>
                                <Input
                                    id="altura"
                                    type="number"
                                    value={formData.altura}
                                    onChange={(e) => setFormData({...formData, altura: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="numeroNiveles">Número de Niveles</Label>
                                <Input
                                    id="numeroNiveles"
                                    type="number"
                                    value={formData.numeroNiveles}
                                    onChange={(e) => setFormData({...formData, numeroNiveles: e.target.value})}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="condicionEstructural">Condición Estructural</Label>
                            <Textarea
                                id="condicionEstructural"
                                value={formData.condicionEstructural}
                                onChange={(e) => setFormData({...formData, condicionEstructural: e.target.value})}
                                placeholder="Describe el estado de la estructura, uniones, plataformas..."
                                className="h-24"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="observaciones">Observaciones Adicionales</Label>
                            <Textarea
                                id="observaciones"
                                value={formData.observaciones}
                                onChange={(e) => setFormData({...formData, observaciones: e.target.value})}
                                placeholder="Anota cualquier observación relevante..."
                                className="h-24"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Fotografías</Label>
                            <div className="flex flex-wrap gap-4">
                                <Button 
                                    type="button" 
                                    variant="outline"
                                    className="relative"
                                    onClick={() => document.getElementById('imagenes').click()}
                                >
                                    <Camera className="w-4 h-4 mr-2" />
                                    Agregar Fotos
                                </Button>
                                <Input
                                    id="imagenes"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </div>
                            
                            {/* Preview de imágenes */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                                {imagesPreviews.map((preview, index) => (
                                    <div key={index} className="relative aspect-square">
                                        <img
                                            src={preview}
                                            alt={`Preview ${index + 1}`}
                                            className="object-cover w-full h-full rounded-lg"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Button type="submit" className="w-full">
                            Guardar Inspección
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Form1;