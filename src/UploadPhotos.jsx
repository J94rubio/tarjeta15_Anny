import React, { useState } from 'react';
import PhotoUploader from './PhotoUploader';

function UploadPhotos() {
  const [photos, setPhotos] = useState([]);
  const [showUploader, setShowUploader] = useState(true);

  const handlePhotosUploaded = (newPhotos) => {
    setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
    setShowUploader(false);
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#2d3436',
          marginBottom: '2rem',
          fontFamily: 'Georgia, serif'
        }}>
          Sube tus Fotos del Evento
        </h1>

        {showUploader && (
          <div style={{ marginBottom: '2rem' }}>
            <PhotoUploader onPhotosUploaded={handlePhotosUploaded} />
          </div>
        )}

        {photos.length > 0 && (
          <div>
            <h2 style={{
              color: '#2d3436',
              marginBottom: '1rem'
            }}>
              Fotos Subidas ({photos.length})
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              {photos.map((photo, index) => (
                <div key={index} style={{
                  position: 'relative',
                  background: 'white',
                  borderRadius: '10px',
                  padding: '10px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}>
                  <img 
                    src={photo.url} 
                    alt={photo.name}
                    style={{
                      width: '100%',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '5px'
                    }}
                  />
                  <button
                    onClick={() => removePhoto(index)}
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      background: '#ff4757',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '25px',
                      height: '25px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    
                  </button>
                  <div style={{
                    marginTop: '5px',
                    fontSize: '12px',
                    color: '#666',
                    textAlign: 'center'
                  }}>
                    {photo.name}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => setShowUploader(true)}
                style={{
                  background: '#00b894',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  marginRight: '10px'
                }}
              >
                Subir Más Fotos
              </button>
              
              <button
                onClick={() => window.history.back()}
                style={{
                  background: '#ff6b6b',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Volver a la Invitación
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadPhotos;
