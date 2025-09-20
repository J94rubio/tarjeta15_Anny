import React, { useState } from 'react';
import { uploadPhotoToMongoDB } from './eventPhotosService';
import Swal from 'sweetalert2';

function PhotoUploader({ onPhotoUploaded }) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [userName, setUserName] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleFileUpload = async (files) => {
    if (!userName.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Nombre requerido',
        text: 'Por favor ingresa tu nombre antes de subir fotos.',
        background: '#fff0f6',
        color: '#b43b35',
        confirmButtonColor: '#e48497'
      });
      return;
    }

    setUploading(true);
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/')) {
          console.log(`📤 Subiendo foto ${i + 1}/${files.length}: ${file.name}`);
          
          await uploadPhotoToMongoDB(file, userName, descripcion);
          
          console.log(`✅ Foto ${i + 1} subida exitosamente`);
        }
      }
      
      // Mostrar mensaje de éxito
      Swal.fire({
        icon: 'success',
        title: '¡Fotos subidas exitosamente!',
        text: `Se subieron ${files.length} foto(s) al evento.`,
        background: '#fff0f6',
        color: '#b43b35',
        confirmButtonColor: '#e48497'
      });
      
      // Llamar callback para refrescar la galería
      if (onPhotoUploaded) {
        onPhotoUploaded();
      }
      
    } catch (error) {
      console.error('❌ Error subiendo fotos:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al subir fotos',
        text: 'Hubo un problema al subir las fotos. Por favor intenta de nuevo.',
        background: '#fff0f6',
        color: '#b43b35',
        confirmButtonColor: '#e48497'
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleInputChange = (e) => {
    const files = Array.from(e.target.files);
    handleFileUpload(files);
  };

  return (
    <div>
      {/* Estilos específicos del PhotoUploader */}
      <style>
        {`
          .uploader-label {
            font-family: 'Bellerose', Arial, sans-serif;
            color: #AC3939;
            font-size: 1.1rem;
            font-weight: bold;
            text-shadow: 0 1px 2px rgba(172, 57, 57, 0.1);
          }
          .uploader-input {
            font-family: 'Bellerose', Arial, sans-serif;
            border: 2px solid #e48497;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.9);
            color: #a44a54;
            transition: all 0.3s ease;
          }
          .uploader-input:focus {
            border-color: #AC3939;
            box-shadow: 0 0 0 3px rgba(172, 57, 57, 0.1);
            outline: none;
          }
          .uploader-input::placeholder {
            color: #b08a93;
            font-style: italic;
          }
          .upload-area {
            border: 3px dashed #e48497;
            background: rgba(255, 255, 255, 0.8);
            transition: all 0.3s ease;
          }
          .upload-area.drag-over {
            border-color: #AC3939;
            background: rgba(255, 182, 193, 0.2);
            transform: scale(1.02);
          }
          .upload-button {
            background: linear-gradient(145deg, #AC3939, #b43b35);
            color: white;
            font-family: 'Bellerose', Arial, sans-serif;
            border: none;
            border-radius: 12px;
            padding: 12px 24px;
            font-size: 1.1rem;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(172, 57, 57, 0.3);
            transition: all 0.3s ease;
          }
          .upload-button:hover {
            background: linear-gradient(145deg, #b43b35, #c44248);
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(172, 57, 57, 0.4);
          }
        `}
      </style>

      {/* Campos de información */}
      <div style={{ marginBottom: '1.8rem' }}>
        <div style={{ marginBottom: '1.2rem' }}>
          <label className="uploader-label" style={{ 
            display: 'block', 
            marginBottom: '0.6rem'
          }}>
            Tu nombre *
          </label>
          <input
            className="uploader-input"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Escribe tu nombre completo"
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '1.2rem' }}>
          <label className="uploader-label" style={{ 
            display: 'block', 
            marginBottom: '0.6rem'
          }}>
            Descripción (opcional)
          </label>
          <input
            className="uploader-input"
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Describe el momento capturado"
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>

      {/* Área de subida de archivos */}
      <div 
        className={`upload-area ${dragOver ? 'drag-over' : ''}`}
        style={{
          borderRadius: '18px',
          padding: '2.5rem',
          textAlign: 'center',
          position: 'relative'
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {uploading ? (
          <div>
            <div style={{ 
              fontSize: '1.4rem', 
              fontFamily: 'Bellerose, Arial, sans-serif',
              color: '#AC3939',
              fontWeight: 'bold',
              marginBottom: '1rem'
            }}>
              📤 Subiendo fotos...
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                border: '4px solid #e48497',
                borderTop: '4px solid #AC3939',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto'
              }} />
            </div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌸</div>
            <div style={{ 
              fontSize: '1.3rem',
              fontFamily: 'Bellerose, Arial, sans-serif',
              color: '#AC3939',
              marginBottom: '0.8rem',
              fontWeight: 'bold'
            }}>
              Arrastra y suelta tus fotos aquí
            </div>
            <div style={{ 
              margin: '1.2rem 0', 
              fontSize: '1.1rem',
              fontFamily: 'Bellerose, Arial, sans-serif',
              color: '#a44a54' 
            }}>
              o
            </div>
            <label className="upload-button">
              📷 Seleccionar Archivos
              <input 
                type="file" 
                multiple 
                accept="image/*"
                onChange={handleInputChange}
                style={{ display: 'none' }}
              />
            </label>
            
            {/* Pequeños detalles decorativos */}
            <div style={{ 
              marginTop: '1.5rem',
              fontSize: '0.9rem',
              fontFamily: 'Bellerose, Arial, sans-serif',
              color: '#b08a93',
              fontStyle: 'italic'
            }}>
              Formatos soportados: JPG, PNG, GIF
            </div>
          </div>
        )}
      </div>
      
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default PhotoUploader;
