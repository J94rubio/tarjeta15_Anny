// Modal para subir fotos
import React from 'react';
import PhotoUploader from './PhotoUploader';

const PhotoUploadModal = ({ isOpen, onClose, onPhotoUploaded }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Estilos para las fuentes */}
      <style>
        {`
          @font-face {
            font-family: 'Bellerose';
            src: url('/fuentes/Bellerose.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
          }
          @font-face {
            font-family: 'Beckan';
            src: url('/fuentes/Beckan.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
          }
          .modal-overlay {
            backdrop-filter: blur(5px);
          }
          .modal-container {
            background: linear-gradient(145deg, #fdb4bf 0%, #ffb6c1 100%);
            border: 3px solid #AC3939;
            box-shadow: 0 20px 40px rgba(172, 57, 57, 0.4);
          }
          .modal-title-beckan {
            font-family: 'Beckan', Arial, sans-serif;
            color: #AC3939;
            text-shadow: 0 2px 4px rgba(172, 57, 57, 0.2);
          }
          .modal-subtitle-bellerose {
            font-family: 'Bellerose', Arial, sans-serif;
            color: #a44a54;
          }
          .close-button {
            background: #AC3939;
            color: white;
            border: 2px solid #b43b35;
            box-shadow: 0 4px 8px rgba(172, 57, 57, 0.3);
            transition: all 0.3s ease;
          }
          .close-button:hover {
            background: #b43b35;
            transform: scale(1.1);
            box-shadow: 0 6px 12px rgba(172, 57, 57, 0.4);
          }
        `}
      </style>
      
      <div className="modal-overlay" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(172, 57, 57, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem'
      }}>
        <div className="modal-container" style={{
          borderRadius: '25px',
          padding: '2.5rem',
          maxWidth: '550px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative'
        }}>
          {/* Botón de cerrar */}
          <button
            className="close-button"
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '20px',
              right: '25px',
              fontSize: '1.8rem',
              cursor: 'pointer',
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold'
            }}
          >
            ×
          </button>

          {/* Decoración con orquídeas */}
          <img 
            src="/Orquidea3.svg" 
            alt="Orquídea decorativa izquierda" 
            style={{ 
              position: 'absolute', 
              top: '-20px', 
              left: '-30px', 
              width: '100px', 
              height: 'auto', 
              opacity: 0.4, 
              pointerEvents: 'none', 
              transform: 'scaleX(-1) rotate(-45deg)',
              filter: 'invert(58%) sepia(70%) saturate(1100%) hue-rotate(-20deg) brightness(70%)'
            }} 
          />
          <img 
            src="/Orquidea3.svg" 
            alt="Orquídea decorativa derecha" 
            style={{ 
              position: 'absolute', 
              bottom: '-20px', 
              right: '-30px', 
              width: '100px', 
              height: 'auto', 
              opacity: 0.4, 
              pointerEvents: 'none', 
              transform: 'scaleX(1) rotate(45deg)',
              filter: 'invert(58%) sepia(70%) saturate(1100%) hue-rotate(-20deg) brightness(70%)'
            }} 
          />

          {/* Título del modal */}
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '2rem',
            marginTop: '1rem',
            position: 'relative',
            zIndex: 2
          }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '0.8rem' }}>📸</div>
            <h2 className="modal-title-beckan" style={{
              fontSize: '2.5rem',
              margin: '0 0 0.5rem 0',
              fontWeight: 'bold'
            }}>
              ¡Comparte tus Fotos!
            </h2>
            <p className="modal-subtitle-bellerose" style={{
              fontSize: '1.3rem',
              margin: '0.5rem 0 0 0',
              lineHeight: '1.4'
            }}>
              Sube tus mejores momentos del evento de Anny
            </p>
            
            {/* Separador decorativo */}
            <div style={{ margin: '1.5rem 0' }}>
              <img 
                src="/separador2.svg" 
                alt="Separador decorativo" 
                style={{ 
                  width: '120px', 
                  height: 'auto', 
                  opacity: 0.6,
                  filter: 'invert(58%) sepia(70%) saturate(1100%) hue-rotate(-20deg) brightness(70%)'
                }} 
              />
            </div>
          </div>

          {/* Componente PhotoUploader */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <PhotoUploader 
              onPhotoUploaded={() => {
                onPhotoUploaded();
                onClose(); // Cerrar modal después de subir
              }} 
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PhotoUploadModal;
