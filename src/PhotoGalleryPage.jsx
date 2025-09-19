import React, { useState, useEffect } from 'react';
import { loadEventPhotos } from './eventPhotosService';

function PhotoGalleryPage() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const eventPhotos = await loadEventPhotos();
        setPhotos(eventPhotos);
      } catch (error) {
        console.error('Error loading photos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: '#ffa8c5' // fondo rosa principal
      }}>
        <div style={{ fontFamily: 'Beckan, Arial, sans-serif', color: '#b43b35', fontSize: '1.3rem' }}>Cargando fotos...</div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#ffa8c5',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#b43b35',
          marginBottom: '2rem',
          fontFamily: 'Beckan, Arial, sans-serif',
          fontWeight: 'bold',
          fontSize: '2.5rem',
          letterSpacing: '0.05em'
        }}>
          Galería de Fotos - 15 Años Anny
        </h1>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          {photos.map((photo, index) => (
            <div key={index} style={{
              background: '#fff0f6',
              borderRadius: '18px',
              padding: '10px',
              boxShadow: '0 4px 12px #e48497',
              border: '2px solid #e48497',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <img 
                src={photo.url} 
                alt={`Foto ${index + 1}`}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '12px'
                }}
              />
              <div style={{ fontFamily: 'Beckan, Arial, sans-serif', color: '#b43b35', fontSize: '1.1rem', marginTop: '0.5rem' }}>{photo.userName}</div>
              <div style={{ fontFamily: 'Bellerose, Arial, sans-serif', color: '#b43b35', fontSize: '0.9rem' }}>{photo.uploadDate}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button 
            onClick={() => window.history.back()}
            style={{
              background: '#e48497',
              color: '#fff',
              border: 'none',
              padding: '12px 32px',
              borderRadius: '14px',
              cursor: 'pointer',
              fontSize: '1.2rem',
              fontFamily: 'Beckan, Arial, sans-serif',
              fontWeight: 'bold',
              boxShadow: '0 2px 8px rgba(172,57,57,0.12)'
            }}
          >
            Volver a la Invitación
          </button>
        </div>
      </div>
    </div>
  );
}

export default PhotoGalleryPage;
