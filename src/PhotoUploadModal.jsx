// Modal para subir fotos
import React from 'react';
import PhotoUploader from './PhotoUploader';

const PhotoUploadModal = ({ isOpen, onClose, onPhotoUploaded }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '2rem',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        border: '3px solid #ff6b6b'
      }}>
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '20px',
            background: 'none',
            border: 'none',
            fontSize: '2rem',
            cursor: 'pointer',
            color: '#999',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#ff6b6b';
            e.target.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#999';
          }}
        >
          ×
        </button>

        {/* Título del modal */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '1.5rem',
          marginTop: '0.5rem'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📸</div>
          <h2 style={{
            color: '#e91e63',
            fontFamily: '"Dancing Script", cursive',
            fontSize: '2rem',
            margin: 0
          }}>
            ¡Comparte tu Foto!
          </h2>
          <p style={{
            color: '#666',
            fontSize: '1rem',
            margin: '0.5rem 0 0 0'
          }}>
            Sube tus mejores momentos del evento de Anny
          </p>
        </div>

        {/* Componente PhotoUploader */}
        <PhotoUploader 
          onPhotoUploaded={() => {
            onPhotoUploaded();
            onClose(); // Cerrar modal después de subir
          }} 
        />
      </div>
    </div>
  );
};

export default PhotoUploadModal;
