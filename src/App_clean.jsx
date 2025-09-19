import React, { useEffect, useState } from 'react';
import { loadEventPhotos } from './eventPhotosService';
import PhotoUploadModal from './PhotoUploadModal';
import './App.css';

// Componente para el efecto de pétalos cayendo
function FallingPetals() {
  const petals = Array.from({ length: 50 }, (_, i) => (
    <div
      key={i}
      className="petal"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 10}s`,
        animationDuration: `${8 + Math.random() * 4}s`,
        opacity: Math.random() * 0.8 + 0.2,
        fontSize: `${12 + Math.random() * 8}px`
      }}
    >
      🌸
    </div>
  ));

  return (
    <div className="petals-container">
      {petals}
    </div>
  );
}

// Componente para lluvia de sobres
function FallingEnvelopes() {
  const envelopes = Array.from({ length: 25 }, (_, i) => (
    <div
      key={i}
      className="envelope"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 8}s`,
        animationDuration: `${10 + Math.random() * 5}s`,
        opacity: Math.random() * 0.7 + 0.3,
        fontSize: `${16 + Math.random() * 12}px`
      }}
    >
      💌
    </div>
  ));

  return (
    <div className="envelopes-container">
      {envelopes}
    </div>
  );
}

// Componente para la vista previa de la galería de fotos
function PhotoGalleryPreview({ photos, loading }) {
  const displayPhotos = photos.slice(0, 6); // Mostrar solo las primeras 6 fotos

  return (
    <div style={{ margin: '2rem 0' }}>
      <h3 style={{ 
        fontFamily: 'inherit', 
        color: '#e91e63', 
        fontSize: '2rem',
        marginBottom: '1rem'
      }}>
        📸 Primeras Fotos Compartidas
      </h3>
      
      {loading ? (
        <div style={{
          background: 'rgba(255,255,255,0.8)',
          padding: '2rem',
          borderRadius: '15px',
          margin: '1rem 0',
          textAlign: 'center'
        }}>
          <p style={{ color: '#666', fontSize: '1rem', margin: 0 }}>
            ⏳ Cargando fotos compartidas...
          </p>
        </div>
      ) : photos.length === 0 ? (
        <div style={{
          background: 'rgba(255,255,255,0.8)',
          padding: '2rem',
          borderRadius: '15px',
          margin: '1rem 0',
          border: '2px dashed #ff6b9d'
        }}>
          <p style={{ color: '#666', fontSize: '1rem', margin: 0 }}>
            🎉 ¡Sé el primero en compartir tus fotos del evento!
          </p>
        </div>
      ) : (
        <>
          <div className="photo-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '0.8rem',
            margin: '1rem 0',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            {displayPhotos.map((photo) => (
              <div key={photo.id} style={{
                background: 'white',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
                transition: 'transform 0.3s ease'
              }}>
                <img
                  src={photo.url}
                  alt={`Foto de ${photo.userName}`}
                  style={{
                    width: '100%',
                    height: '100px',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  padding: '0.5rem',
                  fontSize: '0.7rem',
                  color: '#666',
                  textAlign: 'center'
                }}>
                  <div style={{ fontWeight: 'bold', color: '#e91e63' }}>
                    {photo.userName}
                  </div>
                  <div>{photo.uploadDate}</div>
                </div>
              </div>
            ))}
          </div>
          
          {photos.length > 6 && (
            <p style={{ 
              color: '#666', 
              fontSize: '0.9rem',
              fontStyle: 'italic',
              margin: '1rem 0 0 0'
            }}>
              y {photos.length - 6} fotos más...
            </p>
          )}
        </>
      )}
    </div>
  );
}

const EVENT_DATE = new Date('2025-11-29T19:00:00'); 
const MAP_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.2087516!2d-74.1042637!3d4.5868015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9f0595da02e9%3A0x9c33a0b8be98532b!2sEventos%20y%20Recepciones%20Moon%20Night!5e0!3m2!1sen!2sco!4v1600000000000!5m2!1sen!2sco'; 

// URL para "A Thousand Years" de Christina Perri
const MUSIC_URL = '/music/a-thousand-years.mp3';
const MUSIC_FALLBACK = 'https://www.bensound.com/bensound-music/bensound-romantic.mp3';

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = EVENT_DATE - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown" style={{ 
      fontSize: '2rem', 
      margin: '1rem 0', 
      color: '#e91e63', 
      fontWeight: 'bold', 
      letterSpacing: '2px', 
      background: 'rgba(255,255,255,0.8)', 
      borderRadius: '12px', 
      padding: '0.5rem 1rem', 
      display: 'inline-block', 
      border: '2px solid #ff6b6b' 
    }}>
      <span>{timeLeft.days} días </span>
      <span>{timeLeft.hours} horas </span>
      <span>{timeLeft.minutes} min </span>
      <span>{timeLeft.seconds} seg</span>
    </div>
  );
}

const App = () => {
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [audioRef, setAudioRef] = useState(null);

  // Cargar fotos reales del evento
  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      setLoadingPhotos(true);
      const photos = await loadEventPhotos();
      setUploadedPhotos(photos);
    } catch (error) {
      console.error('Error cargando fotos:', error);
      // Fotos de fallback
      setUploadedPhotos([
        {
          id: 'fallback1',
          url: 'https://images.unsplash.com/photo-1464047736614-af63643285bf?w=300&h=200&fit=crop',
          fileName: 'ejemplo1.jpg',
          uploadDate: 'Foto de ejemplo'
        }
      ]);
    } finally {
      setLoadingPhotos(false);
    }
  };

  // Función para refrescar fotos después de subir una nueva
  const handlePhotoUploaded = () => {
    loadPhotos(); // Recargar la galería
  };

  // Función para manejar la música
  const toggleMusic = () => {
    if (audioRef) {
      if (musicPlaying) {
        audioRef.pause();
        setMusicPlaying(false);
      } else {
        audioRef.play().then(() => {
          setMusicPlaying(true);
        }).catch(error => {
          console.error('Error reproduciendo música:', error);
        });
      }
    }
  };

  return (
    <div style={{
      fontFamily: '"Dancing Script", cursive',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #ffe8e8 0%, #ffb3ba 50%, #ff7a85 100%)',
      minHeight: '100vh',
      padding: '1rem',
      position: 'relative',
      boxShadow: '0 0 40px #ff7a85 inset',
      overflow: 'hidden',
    }}>
      {/* Efecto de pétalos cayendo */}
      <FallingPetals />
      
      {/* Botón de música flotante */}
      <button
        onClick={toggleMusic}
        className="music-button"
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: musicPlaying ? '#e91e63' : 'rgba(233, 30, 99, 0.7)',
          border: '3px solid white',
          color: 'white',
          fontSize: '1.5rem',
          cursor: 'pointer',
          zIndex: 1000,
          boxShadow: '0 4px 15px rgba(233, 30, 99, 0.3)',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.backgroundColor = '#c2185b';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.backgroundColor = musicPlaying ? '#e91e63' : 'rgba(233, 30, 99, 0.7)';
        }}
        title={musicPlaying ? 'Pausar música' : 'Reproducir música'}
      >
        💖
      </button>
      
      <div className="main-card" style={{
        background: 'rgba(255,255,255,0.9)',
        borderRadius: '24px',
        maxWidth: '400px',
        margin: '2rem auto',
        boxShadow: '0 8px 32px #ff7a85',
        padding: '2rem',
        border: '2px solid #ff6b6b',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)' }}>
          <span style={{ fontSize: '3rem', color: '#ff6b6b' }}>💖</span>
        </div>
        
        <h1 className="main-title" style={{ 
          fontFamily: 'inherit', 
          fontSize: '2.5rem', 
          color: '#e91e63', 
          marginBottom: '0.5rem' 
        }}>
          15's Anny Rubio
        </h1>

        {/* Foto de la quinceañera */}
        <div style={{ marginBottom: '1rem' }}>
          <img 
            src="/AnnyAzul.jpg" 
            alt="Anny Tatiana Rubio Duque" 
            style={{ 
              width: '150px', 
              height: '150px', 
              borderRadius: '50%', 
              objectFit: 'cover',
              border: '4px solid #ff6b6b',
              boxShadow: '0 4px 12px rgba(255, 107, 107, 0.3)',
              marginBottom: '1rem'
            }} 
          />
        </div>
        
        <h2 className="subtitle" style={{ 
          fontFamily: 'inherit', 
          fontSize: '1.5rem', 
          color: '#c2185b', 
          marginBottom: '1rem' 
        }}>
          En esta fecha tan importante José Rubio y Daniela Duque te invitan a celebrar los 15 años de Anny Tatiana Rubio Duque
        </h2>
        
        <div style={{ fontSize: '1.2rem', color: '#ad1457', marginBottom: '1rem' }}>
          <strong>29 de noviembre de 2025</strong><br />
          <span>7:00 PM</span><br />
        </div>
        
        <Countdown />
        
        <div style={{ margin: '1.5rem 0' }}>
          <h3 style={{ fontFamily: 'inherit', color: '#e91e63', fontSize: '2.2rem' }}>
            Ubicación del evento
          </h3>
          <span style={{ fontSize: '1.3rem', color: '#c2185b' }}>Cl 17 Sur #22 - 37</span>
          <iframe
            className="map-iframe"
            title="Mapa"
            src={MAP_URL}
            width="300"
            height="200"
            style={{ borderRadius: '12px', border: '2px solid #ff6b6b' }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        {/* Sección de fotos */}
        <div style={{ margin: '2rem 0' }}>
          <h3 style={{ fontFamily: 'inherit', color: '#e91e63', fontSize: '2rem', marginBottom: '1rem' }}>
            📷 Comparte tus Fotos del Evento
          </h3>
          
          <button
            onClick={() => setShowPhotoModal(true)}
            style={{
              background: 'linear-gradient(45deg, #e91e63, #f06292)',
              color: 'white',
              border: 'none',
              borderRadius: '15px',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 4px 15px rgba(233,30,99,0.3)',
              fontFamily: '"Dancing Script", cursive',
              marginBottom: '1rem'
            }}
          >
            📤 Subir Foto
          </button>

          {/* Vista previa de la galería */}
          <PhotoGalleryPreview photos={uploadedPhotos} loading={loadingPhotos} />
        </div>

        {/* Modal para subir fotos */}
        <PhotoUploadModal 
          isOpen={showPhotoModal} 
          onClose={() => setShowPhotoModal(false)}
          onPhotoUploaded={handlePhotoUploaded}
        />

        {/* Elemento de audio */}
        <audio 
          ref={(audio) => {
            if (audio && !audioRef) {
              setAudioRef(audio);
              audio.addEventListener('ended', () => setMusicPlaying(false));
              audio.addEventListener('pause', () => setMusicPlaying(false));
              audio.addEventListener('play', () => setMusicPlaying(true));
            }
          }}
          loop 
          preload="auto"
          style={{ display: 'none' }}
        >
          <source src={MUSIC_URL} type="audio/mpeg" />
          <source src={MUSIC_FALLBACK} type="audio/mpeg" />
          Tu navegador no soporta audio.
        </audio>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
        
        .petals-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }
        
        .petal {
          position: absolute;
          top: -50px;
          animation: fall linear infinite;
          user-select: none;
          pointer-events: none;
        }
        
        @keyframes fall {
          0% {
            transform: translateY(-100px) rotateZ(0deg);
          }
          100% {
            transform: translateY(100vh) rotateZ(360deg);
          }
        }
        
        /* Estilos responsivos para móviles */
        @media (max-width: 768px) {
          .main-card {
            max-width: 95% !important;
            margin: 1rem auto !important;
            padding: 1.5rem !important;
          }
          
          .main-title {
            font-size: 2rem !important;
          }
          
          .subtitle {
            font-size: 1.2rem !important;
          }
          
          .music-button {
            width: 50px !important;
            height: 50px !important;
            top: 15px !important;
            right: 15px !important;
            font-size: 1.2rem !important;
          }
          
          .map-iframe {
            width: 100% !important;
            height: 150px !important;
          }
          
          .countdown {
            font-size: 1.2rem !important;
            padding: 0.3rem 0.8rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default App;