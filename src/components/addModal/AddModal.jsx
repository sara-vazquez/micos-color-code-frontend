import React, {useState, useEffect} from 'react';
import './AddModal.css';
import Button from '../buttons/Button';

export default function AddModal({resource, onSave, onClose}) {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    
    const [formData, setFormData] = useState({
        name: '',
        intro: '',
        description: '',
        imageFile: null,
        pdfFile: null,
        existingImagePath: '', 
        existingPdfPath: ''    
    })

    const [previewImage, setPreviewImage] = useState(null);
    const [errors, setErrors] = useState({});

    const fileId = `file-upload-${Date.now()}`;

    useEffect(() => {
        if (resource) {
            console.log('🔍 Recurso a editar:', resource);
            
            setFormData({
                name: resource.name || '',
                intro: resource.intro || '',
                description: resource.description || '',
                imageFile: null,
                pdfFile: null,
                existingImagePath: resource.imageFile || '', 
                existingPdfPath: resource.pdfFile || ''      
            });
            if (resource.imageFile) {
                setPreviewImage(`${API_BASE_URL}${resource.imageFile}`);
            }
        } else {
            setFormData({
                name: '',
                intro: '',
                description: '',
                imageFile: null,
                pdfFile: null,
                existingImagePath: '',
                existingPdfPath: ''
            });
            setPreviewImage(null);
        }
    }, [resource, API_BASE_URL]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setErrors({ ...errors, imageFile: 'Por favor selecciona un archivo de imagen' });
                return;
            }

            setFormData({ ...formData, imageFile: file });
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
            
            if (errors.imageFile) {
                setErrors({ ...errors, imageFile: null });
            }
        }
    };

    const handlePdfChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type !== 'application/pdf') {
                setErrors({ ...errors, pdfFile: 'Por favor selecciona un archivo PDF' });
                return;
            }

            setFormData({ ...formData, pdfFile: file });
            setErrors({ ...errors, pdfFile: null });
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es obligatorio';
        }

        if (!formData.intro.trim()) {
            newErrors.intro = 'La introducción es obligatoria';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'La descripción es obligatoria';
        }

        if (!resource) {
            if (!formData.imageFile) {
                newErrors.imageFile = 'Debes seleccionar una imagen';
            }
            if (!formData.pdfFile) {
                newErrors.pdfFile = 'Debes seleccionar un archivo PDF';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validate()) return;
    
        const data = new FormData();
        data.append('name', formData.name);
        data.append('intro', formData.intro);
        data.append('description', formData.description);
    
        if (formData.imageFile) {
            data.append('image', formData.imageFile);
            console.log('📤 Enviando imagen nueva');
        } else if (resource && formData.existingImagePath) {
            data.append('existingImagePath', formData.existingImagePath);
            console.log('📤 Manteniendo imagen existente:', formData.existingImagePath);
        }
        
        if (formData.pdfFile) {
            data.append('pdf', formData.pdfFile);
            console.log('📤 Enviando PDF nuevo');
        } else if (resource && formData.existingPdfPath) {
            data.append('existingPdfPath', formData.existingPdfPath);
            console.log('📤 Manteniendo PDF existente:', formData.existingPdfPath);
        }
        
        console.log('📤 FormData a enviar:', {
            name: formData.name,
            intro: formData.intro,
            description: formData.description,
            hasNewImage: !!formData.imageFile,
            hasNewPdf: !!formData.pdfFile,
            existingImagePath: formData.existingImagePath,
            existingPdfPath: formData.existingPdfPath
        });
    
        onSave(data);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return(
        <section className="add-modal__overlay" onClick={handleOverlayClick}>
            <form className="add-modal__content" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
                <h2 className="add-modal__title">
                    {resource ? 'Editar recurso' : 'Añadir nuevo recurso'}
                </h2>
                <article className="add-modal__img-container">
                    {previewImage ? (
                        <img 
                            src={previewImage} 
                            alt="Vista previa" 
                            className="add-modal__img" 
                        />
                    ) : (
                        <p className="add-modal__placeholder">Vista previa de tu imagen</p>
                    )}
                </article>
            
                <article className="add-modal__input-group">
                    <label className="add-modal__label" htmlFor="image-upload">
                        Imagen {!resource && '*'}
                        {resource && ' (opcional - dejar vacío para mantener la actual)'}
                    </label>
                    <input 
                        id="image-upload"
                        className="add-modal__input" 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageChange}
                        aria-label='campo para seleccionar imágen'
                    />
                    {errors.imageFile && <span className="add-modal__error">{errors.imageFile}</span>}

                    <label className="add-modal__label" htmlFor="name">Nombre *</label>
                    <input 
                        id="name"
                        name="name"
                        className="add-modal__input" 
                        placeholder='Nombre del recurso'
                        value={formData.name}
                        onChange={handleChange}
                        aria-label='campo para poner el nombre'
                    />
                    {errors.name && <span className="add-modal__error">{errors.name}</span>}

                    <label className="add-modal__label" htmlFor="intro">Introducción *</label>
                    <input 
                        id="intro"
                        name="intro"
                        className="add-modal__input" 
                        placeholder='Cuenta brevemente qué es el archivo'
                        value={formData.intro}
                        onChange={handleChange}
                        aria-label='campo para la introducción'
                    />
                    {errors.intro && <span className="add-modal__error">{errors.intro}</span>}

                    <label className="add-modal__label" htmlFor="description">Descripción *</label>
                    <textarea 
                        id="description"
                        name="description"
                        className="add-modal__textarea" 
                        placeholder="Describe en qué consiste este recurso"
                        value={formData.description}
                        onChange={handleChange}
                        aria-label='campo para la descripción'
                    />
                    {errors.description && <span className="add-modal__error">{errors.description}</span>}

                    <label className="add-modal__label" htmlFor={fileId}>
                        Archivo PDF {!resource && '*'}
                        {resource && ' (opcional - dejar vacío para mantener el actual)'}
                    </label>
                    <input 
                        id={fileId}
                        className="add-modal__input" 
                        type="file" 
                        accept="application/pdf"
                        onChange={handlePdfChange}
                        aria-label='campo para seleccionar el pdf'
                    />
                    {errors.pdfFile && <span className="add-modal__error">{errors.pdfFile}</span>}
                </article>

                <article className="add-modal__actions">
                    <Button type="button" onClick={onClose} variant="secondary" aria-label="botón para cancelar la acción">
                        Cancelar
                    </Button>
                    <Button type="submit" variant="primary" aria-label="botón para guardar los cambios">
                        {resource ? 'Actualizar' : 'Guardar'}
                    </Button>
                </article>
            </form>
        </section>
    );
}