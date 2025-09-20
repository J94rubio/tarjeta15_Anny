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
      {/* Campos de información */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            color: '#333',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}>
            Tu nombre *
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Escribe tu nombre completo"
            style={{
              width: '100%',
              padding: '0.8rem',
              border: '2px solid #ddd',
              borderRadius: '8px',
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            color: '#333',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}>
            Descripción (opcional)
          </label>
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Describe el momento capturado"
            style={{
              width: '100%',
              padding: '0.8rem',
              border: '2px solid #ddd',
              borderRadius: '8px',
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>

      {/* Área de subida de archivos */}
      <div style={{
        border: `2px dashed ${dragOver ? '#ff6b6b' : '#ddd'}`,
        borderRadius: '10px',
        padding: '2rem',
        textAlign: 'center',
        backgroundColor: dragOver ? '#fff5f5' : '#f9f9f9',
        transition: 'all 0.3s ease'
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      >
        {uploading ? (
          <div>
            <div>📤 Subiendo fotos...</div>
            <div style={{ marginTop: '1rem' }}>
              <div style={{
                width: '50px',
                height: '50px',
                border: '3px solid #ff6b6b',
                borderTop: '3px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto'
              }} />
            </div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📸</div>
            <div>Arrastra y suelta tus fotos aquí</div>
            <div style={{ margin: '1rem 0', color: '#666' }}>o</div>
            <label style={{
              background: '#ff6b6b',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              display: 'inline-block'
            }}>
              Seleccionar Archivos
              <input 
                type="file" 
                multiple 
                accept="image/*"
                onChange={handleInputChange}
                style={{ display: 'none' }}
              />
            </label>
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
