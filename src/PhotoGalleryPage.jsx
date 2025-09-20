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
      <>
        {/* Estilos de fuentes */}
        <style>
          {`
            @font-face {
              font-family: 'Beckan';
              src: url('/fuentes/Beckan.ttf') format('truetype');
              font-weight: normal;
              font-style: normal;
            }
            @font-face {
              font-family: 'Bellerose';
              src: url('/fuentes/Bellerose.ttf') format('truetype');
              font-weight: normal;
              font-style: normal;
            }
          `}
        </style>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          backgroundColor: '#fdb4bf' // mismo fondo que la app principal
        }}>
          <div style={{ 
            fontFamily: 'Beckan, Arial, sans-serif', 
            color: '#AC3939', 
            fontSize: '1.8rem',
            fontWeight: 'bold',
            textShadow: '0 2px 4px rgba(172, 57, 57, 0.2)'
          }}>
            📸 Cargando fotos...
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Estilos de fuentes y CSS personalizado */}
      <style>
        {`
          @font-face {
            font-family: 'Beckan';
            src: url('/fuentes/Beckan.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
          }
          @font-face {
            font-family: 'Bellerose';
            src: url('/fuentes/Bellerose.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
          }
          .gallery-title {
            font-family: 'Beckan', Arial, sans-serif !important;
            color: #AC3939;
            text-shadow: 0 3px 6px rgba(172, 57, 57, 0.3);
          }
          .photo-card {
            background: rgba(255, 255, 255, 0.9);
            transition: all 0.3s ease;
          }
          .photo-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(172, 57, 57, 0.3);
          }
          .photo-username {
            font-family: 'Beckan', Arial, sans-serif !important;
            color: #AC3939;
            font-weight: bold;
          }
          .photo-date {
            font-family: 'Bellerose', Arial, sans-serif !important;
            color: #a44a54;
          }
          .back-button {
            font-family: 'Beckan', Arial, sans-serif !important;
            background: linear-gradient(145deg, #AC3939, #b43b35);
            color: white;
            border: none;
            padding: 15px 35px;
            border-radius: 18px;
            cursor: pointer;
            font-size: 1.3rem;
            font-weight: bold;
            box-shadow: 0 6px 15px rgba(172, 57, 57, 0.3);
            transition: all 0.3s ease;
          }
          .back-button:hover {
            background: linear-gradient(145deg, #b43b35, #c44248);
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(172, 57, 57, 0.4);
          }
        `}
      </style>
      
      <div style={{
        minHeight: '100vh',
        background: '#fdb4bf', // mismo fondo que la app principal
        padding: '2rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Título principal */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📸</div>
            <h1 className="gallery-title" style={{
              fontSize: '3rem',
              marginBottom: '0.5rem',
              fontWeight: 'bold',
              letterSpacing: '0.05em'
            }}>
              Galería de Fotos
            </h1>
            <div className="gallery-title" style={{
              fontSize: '2rem',
              fontWeight: 'normal',
              opacity: 0.8
            }}>
              15 Años de Anny
            </div>
            
            {/* Separador decorativo */}
            <div style={{ margin: '2rem 0' }}>
              <img 
                src="/separador1.svg" 
                alt="Separador decorativo" 
                style={{ 
                  width: '200px', 
                  height: 'auto',
                  opacity: 0.6,
                  filter: 'invert(58%) sepia(70%) saturate(1100%) hue-rotate(-20deg) brightness(70%)'
                }} 
              />
            </div>
          </div>
          {/* Grid de fotos */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2.5rem'
          }}>
            {photos.length === 0 ? (
              <div style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: '3rem',
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '20px',
                border: '3px dashed #e48497'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                <div className="gallery-title" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                  ¡Sé el primero en compartir!
                </div>
                <div className="photo-date" style={{ fontSize: '1.2rem' }}>
                  Las fotos del evento aparecerán aquí
                </div>
              </div>
            ) : (
              photos.map((photo, index) => (
                <div key={index} className="photo-card" style={{
                  borderRadius: '20px',
                  padding: '15px',
                  boxShadow: '0 6px 15px rgba(172, 57, 57, 0.2)',
                  border: '3px solid #e48497',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  <img 
                    src={photo.url} 
                    alt={`Foto de ${photo.userName}`}
                    style={{
                      width: '100%',
                      height: '220px',
                      objectFit: 'cover',
                      borderRadius: '15px',
                      marginBottom: '1rem'
                    }}
                  />
                  <div className="photo-username" style={{ 
                    fontSize: '1.2rem', 
                    marginBottom: '0.3rem',
                    textAlign: 'center'
                  }}>
                    {photo.userName}
                  </div>
                  <div className="photo-date" style={{ 
                    fontSize: '1rem',
                    textAlign: 'center'
                  }}>
                    {photo.uploadDate}
                  </div>
                  {photo.descripcion && (
                    <div style={{
                      fontFamily: 'Bellerose, Arial, sans-serif',
                      color: '#a44a54',
                      fontSize: '0.9rem',
                      fontStyle: 'italic',
                      textAlign: 'center',
                      marginTop: '0.5rem',
                      padding: '0.5rem',
                      background: 'rgba(172, 57, 57, 0.1)',
                      borderRadius: '8px'
                    }}>
                      "{photo.descripcion}"
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          
          {/* Botón de regreso */}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button 
              className="back-button"
              onClick={() => window.history.back()}
            >
              🌸 Volver a la Invitación
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PhotoGalleryPage;
