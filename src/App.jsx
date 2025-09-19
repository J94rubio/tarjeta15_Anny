import React, { useEffect, useState } from 'react';
import { loadEventPhotos } from './eventPhotosService';
import PhotoUploadModal from './PhotoUploadModal';
import ConfirmationModal from './ConfirmationModal';
import { useNavigate } from 'react-router-dom';
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
    <div className="countdown">
      <div className="countdown-label">FALTAN:</div>
      <div className="countdown-values">
        <span className="countdown-bold beckan-font">{timeLeft.days} días</span>
        <span className="countdown-sep"> - </span>
        <span className="countdown-bold beckan-font">{timeLeft.hours} horas</span>
        <span className="countdown-sep"> - </span>
        <span className="countdown-bold beckan-font">{timeLeft.minutes} min</span>
        <span className="countdown-sep"> - </span>
        <span className="countdown-bold beckan-font">{timeLeft.seconds} seg</span>
      </div>
    </div>
  );
}

const App = () => {
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [audioRef, setAudioRef] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const navigate = useNavigate();

  // Cargar fotos reales del evento
  useEffect(() => {
    const fetchPhotos = async () => {
      setLoadingPhotos(true);
      const photos = await loadEventPhotos();
      setUploadedPhotos(photos);
      setLoadingPhotos(false);
    };
    fetchPhotos();
  }, []);

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
      background: '#fdb4bf',
      minHeight: '100vh',
      width: '100%'
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
          //borderRadius: '50%',
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
        
        maxWidth: '400px',
          margin: '0.5rem auto',
        boxShadow: '0 8px 32px #ff7a85',
  padding: '0.5rem',
        border: '2px solid #ff6b6b',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden'
      }}>
  {/* Orquídea izquierda */}
  <img src="/Orquidea_izq.svg" alt="Orquídea izquierda" style={{ position: 'absolute', top: '0', left: '-35px', width: '180px', height: 'auto', opacity: 0.8, pointerEvents: 'none', zIndex: 10, transform: 'scaleX(-1) rotate(-135deg)' }} />
  {/* Orquídea decorativa detrás de la foto */}
    <img src="/Orquidea_izq.svg" alt="Orquídea decorativa inferior" style={{ position: 'absolute', left: '-100px', top: '400px', width: '280px', height: 'auto', opacity: 0.25, pointerEvents: 'none', zIndex: 0, transform: 'scaleX(-1) rotate(-145deg)', filter: 'invert(58%) sepia(70%) saturate(1100%) hue-rotate(-20deg) brightness(70%)' }} />
  {/* Orquídea derecha */}
  <img src="/Orquidea_der.svg" alt="Orquídea derecha" style={{ position: 'absolute', top: '-50px', right: '-40px', width: '160px', height: 'auto', opacity: 0.8, pointerEvents: 'none', zIndex: 10, transform: 'scaleX(-1) rotate(-110deg)' }} />
  {/* Orquídea decorativa detrás de la foto */}
    <img src="/Orquidea_izq.svg" alt="Orquídea decorativa inferior" style={{ position: 'absolute', right: '-100px', top: '400px', width: '280px', height: 'auto', opacity: 0.25, pointerEvents: 'none', zIndex: 0, transform: 'scaleX(1) rotate(-145deg)', filter: 'invert(58%) sepia(70%) saturate(1100%) hue-rotate(-20deg) brightness(70%)' }} />

  <div style={{ margin: 0, padding: '0px 0.5px 0 0.5px', width: '100%', overflow: 'hidden', borderRadius: '0 0 650px 650px/0 0 680px 680px', position: 'relative' }}>
          <img 
            src="/Anny_editada.png" 
            alt="Anny Tatiana Rubio Duque" 
            style={{ 
              width: '100%', 
              height: 'auto', 
              borderRadius: '0 0 950px 950px/0 0 180px 180px', 
              objectFit: 'cover',
              //border: '1px solid #ff6b6b',
              boxSizing: 'border-box',
              boxShadow: '0 4px 12px rgba(255, 107, 107, 0.3)',
              margin: 0,
              display: 'block'
            }} 
          />
              <img
                src="/logo.svg"
                alt="15_Anny"
                style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: '45px',
                  transform: 'translateX(-50%)',
                  width: '220px',
                  height: 'auto',
                  zIndex: 2,
                  pointerEvents: 'none',
                }}
              />
        </div>

        {/* Foto de la quinceañera */}
        <p className="parrafo-bellerose">
          Dios nos premio con la llegada de Anny a nuestras vidas, hemos tenido la fortuna de ver como ha crecido convirtiéndose en la persona maravillosa que es hoy. Como ha creado una personalidad increíble, llena de nobleza, felicidad y mucho amor. <br /> Por esta y muchas razones más... <br /> En esta fecha tan importante José Rubio y Daniela Duque te invitan a celebrar los 15 años de
        </p>
        
        <div style={{ textAlign: 'center', marginBottom: '2.5rem', marginTop: '2.5rem' }}>
          <img src="/separador1.svg" alt="Separador decorativo 1" style={{ width: '220px', height: 'auto', display: 'inline-block' }} />
        </div>
        <div style={{ fontSize: '1.2rem', color: '#ad1457', marginBottom: '1rem', textAlign: 'center' }}>
          <img src="/fecha.svg" alt="Fecha del evento" style={{ width: '370px', height: 'auto', display: 'inline-block', position: 'relative', zIndex: 5 }} />
        </div>
        <div style={{ textAlign: 'center', margin: '0.5rem 0' }}>
          <img src="/separador2.svg" alt="Separador decorativo 1" style={{ width: '120px', height: 'auto', display: 'inline-block' }} />
        </div>
        
        <div style={{ position: 'relative', width: '100%', maxWidth: '480px', margin: '0 auto' }}>
          <div style={{ position: 'relative', zIndex: 5 }}>
            <Countdown />
          </div>
          <img
            src="/Orquidea4.svg"
            alt="Orquídea decorativa derecha"
            className="orquidea5-img"
            style={{ position: 'absolute', top: '-340px', right: '-100px', width: '320px', zIndex: 2, pointerEvents: 'none',filter: 'invert(58%) sepia(70%) saturate(1100%) hue-rotate(-20deg) brightness(70%)', opacity: 0.25 }}
          />
          <img
            src="/Orquidea3.svg"
            alt="Orquídea decorativa izquierda"
            className="orquidea3-img"
            style={{ position: 'absolute', top: '-110px', left: '-25px', width: '140px', zIndex: 2, pointerEvents: 'none', transform: 'scaleX(-1)',filter: 'invert(58%) sepia(70%) saturate(1100%) hue-rotate(-20deg) brightness(70%)', opacity: 0.25 }}
          />
        </div>

        <div style={{ margin: '2.5rem 0', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
            <img src="/Ramas.svg" alt="Ramas decorativas izquierda" style={{ width: '88px', height: 'auto', transform: 'scaleX(-1)' }} />
            <span className="ubicacion-beckan">Ubicación</span>
            <img src="/Ramas.svg" alt="Ramas decorativas derecha" style={{ width: '88px', height: 'auto' }} />
          </div>
          <span className="ubicacion-beckan">Cl 17 Sur #22 - 37</span>
          <iframe
            className="map-iframe"
            title="Mapa"
            src={MAP_URL}
            width="300"
            height="200"
            style={{ border: '2px solid #ff6b6b', borderRadius: '18px', overflow: 'hidden' }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
          <div style={{ textAlign: 'center', margin: '2.5rem 0 0.5rem 0' }}>
            <img src="/Separador3.svg" alt="Separador decorativo 3" style={{ width: '220px', height: 'auto', display: 'inline-block', filter: 'invert(58%) sepia(70%) saturate(1100%) hue-rotate(-20deg) brightness(70%)', opacity: 0.45 }} />
          </div>
        </div>

        {/* Sección de código de vestimenta */}
        
        <div className="codigo-vestimenta">
          <img src="/Orquidea_der.svg" alt="Orquídea decorativa inferior" style={{ position: 'absolute', right: '-60px', top: '168  0px', width: '180px', height: 'auto', opacity: 0.25, pointerEvents: 'none', zIndex: 0, transform: 'scaleX(-1) rotate(-110deg)', filter: 'invert(58%) sepia(70%) saturate(1100%) hue-rotate(-20deg) brightness(70%)' }} />
          <h2 className="vestimenta-titulo beckan-font">Código de vestimenta</h2>
          <div className="vestimenta-subtitulo bellerose-font">FORMAL ELEGANTE</div>
          <div className="vestimenta-iconos">
            <div className="vestimenta-icono">
              <img src="/vestido.png" alt="Vestido elegante" />
              <div className="vestimenta-texto bellerose-font">Vestido elegante</div>
            </div>
            <div className="vestimenta-icono">
              <img src="/traje.png" alt="Traje formal" />
              <div className="vestimenta-texto bellerose-font">Traje formal</div>
            </div>
          </div>
          <h2 className="vestimenta-titulo beckan-font" style={{ marginTop: '2rem' }}>Colores no permitidos</h2>
          <div className="vestimenta-subtexto bellerose-font">Cualquier tono de Rosa</div>
          <div className="vestimenta-circulos">
            <span className="vestimenta-circulo" style={{ background: '#ffa5c5' }} />
            <span className="vestimenta-circulo" style={{ background: '#ffbcd3' }} />
            <span className="vestimenta-circulo" style={{ background: '#ffd2e2' }} />
            <span className="vestimenta-circulo" style={{ background: '#ffb6c1' }} />
            <span className="vestimenta-circulo" style={{ background: '#ffc1cc' }} />
          </div>
          <div style={{ textAlign: 'center', margin: '2.5rem 0 0.5rem 0' }}>
            <img src="/Separador4.svg" alt="Separador decorativo 4" style={{ width: '220px', height: 'auto', display: 'inline-block', filter: 'invert(58%) sepia(70%) saturate(1100%) hue-rotate(-20deg) brightness(70%)', opacity: 0.45 }} />
          </div>
        </div>
        {/* Sección de confirmación de asistencia */}
        <div style={{ position: 'relative' }}>
          <img src="/Orquidea3.svg" alt="Orquídea esquina superior izquierda" className="confirmacion-orquidea confirmacion-orquidea-der" style={{ position: 'absolute', top: '-74px', left: '-60px', width: '160px', height: 'auto', pointerEvents: 'none', zIndex: 10, transform: 'scaleX(-1) rotate(-95deg)'}} />
          <img src="/Orquidea3.svg" alt="Orquídea esquina inferior derecha" className="confirmacion-orquidea confirmacion-orquidea-der" style={{ position: 'absolute', bottom: '-60px', right: '-60px', width: '160px', height: 'auto', pointerEvents: 'none', zIndex: 10, transform: 'scaleX(-1) rotate(95deg)'}} />
          <div className="confirmacion-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 className="vestimenta-titulo beckan-font" style={{ color: '#ffb6c1' }}>Confirma tu asistencia</h2>
            <div className="confirmacion-texto">
              Antes del 15 de Noviembre haznos saber que contaremos con tu presencia
            </div>
            <button className="confirmacion-btn" onClick={() => setShowConfirmationModal(true)}>CONFIRMAR ASISTENCIA</button>
          </div>
          <ConfirmationModal isOpen={showConfirmationModal} onClose={() => setShowConfirmationModal(false)} />
        </div>
        {/* Sección lluvia de sobres */}
        <div className="lluvia-sobres-container">
          <div className="lluvia-sobres-card">
            <img src="/Esquina.svg" alt="Esquina decorativa superior izquierda" className="lluvia-esquina lluvia-esquina-izq-arriba" style={{ width: '90px', height: 'auto', top: '20px', left: '15px', display: 'inline-block' }} />
            <img src="/Esquina.svg" alt="Esquina decorativa superior derecha" className="lluvia-esquina lluvia-esquina-der-arriba" style={{ width: '90px', height: 'auto', top: '20px', right: '15px', display: 'inline-block' }} />
            <img src="/Esquina.svg" alt="Esquina decorativa inferior izquierda" className="lluvia-esquina lluvia-esquina-izq-abajo" style={{ width: '90px', height: 'auto', bottom: '20px', left: '15px', display: 'inline-block' }} />
            <img src="/Esquina.svg" alt="Esquina decorativa inferior derecha" className="lluvia-esquina lluvia-esquina-der-abajo" style={{ width: '90px', height: 'auto', bottom: '20px', right: '15px', display: 'inline-block' }} />
            <div style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
              <img src="/Separador3.svg" alt="Separador decorativo" style={{ width: '120px', height: 'auto', display: 'inline-block' }} />
            </div>
            <h2 className="lluvia-sobres-titulo beckan-font">LLUVIA DE SOBRES</h2>
            <p className="lluvia-sobres-texto">
              Mi mejor regalo será compartir este día contigo.<br />
              Si deseas obsequiarme algo, estaré recibiendo con cariño tu sobre como parte de esta lluvia de bendiciones.<br />
              ¡Gracias por tu cariño y generosidad!
            </p>
            <div style={{ textAlign: 'center', marginTop: '1.2rem' }}>
              <img src="/Separador3.svg" alt="Separador decorativo" style={{ width: '120px', height: 'auto', display: 'inline-block' }} />
            </div>
          </div>
        </div>
        <style>{`
        .beckan-font {
          font-family: 'Beckan', Arial, sans-serif !important;
        }
        .bellerose-font {
          font-family: 'Bellerose', Arial, sans-serif !important;
        }
        .codigo-vestimenta {
          background: none;
          text-align: center;
        }
        .vestimenta-titulo {
          font-size: 2.6rem;
          color: #a44a54;
          margin-bottom: 0.5rem;
          font-weight: bold;
        }
        .vestimenta-subtitulo {
          font-size: 2rem;
          color: #a44a54;
          margin-bottom: 2rem;
          letter-spacing: 0.15em;
        }
        .vestimenta-iconos {
          display: flex;
          justify-content: center;
          gap: 4rem;
          margin-bottom: 1.5rem;
        }
        .vestimenta-icono {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .vestimenta-icono img {
          width: 110px;
          height: auto;
          margin-bottom: 0.7rem;
        }
        .vestimenta-texto {
          font-size: 1.5rem;
          color: #a44a54;
        }
        .vestimenta-subtexto {
          font-size: 1.5rem;
          color: #a44a54;
          margin-bottom: 2rem;
        }
        .vestimenta-circulos {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        .vestimenta-circulo {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 2.5px solid #fff;
          background: #e7bfc7;
          display: inline-block;
        }
        .confirmacion-card {
          background: #AC3939;
          border-radius: 18px;
          margin: 3rem auto 0 auto;
          max-width: 700px;
          position: relative;
          padding-bottom: 1.5rem;
          text-align: center;
          box-shadow: 0 8px 32px #b43b35;
          border: 2px solid #b43b35;
          overflow: hidden;
        }
        .confirmacion-titulo {
          font-family: 'Bellerose', Arial, sans-serif;
          font-size: 2.7rem;
          color: #fff;
          margin-bottom: 1.5rem;
          font-weight: bold;
        }
        .confirmacion-texto {
          font-family: 'Bellerose', Arial, sans-serif;
          font-size: 1.6rem;
          color: #fff;
          margin-bottom: 2.5rem;
        }
        .confirmacion-btn {
          background: #f7d6d6;
          color: #AC3939;
          font-family: 'Bellerose', Arial, sans-serif;
          font-size: 1rem;
          font-weight: normal;
          border: none;
          border-radius: 18px;
          padding: 1.4rem 3.5rem;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(172,57,57,0.12);
          transition: background 0.2s, color 0.2s;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .confirmacion-btn:hover {
          background: #ffe4ec;
          color: #b43b35;
        }
        .confirmacion-orquidea {
          position: absolute;
          opacity: 0.7;
          pointer-events: none;
        }
        .confirmacion-orquidea-izq {
          top: -40px;
          left: -60px;
          width: 180px;
          transform: scaleX(-1) rotate(-10deg);
          z-index: 1;
        }
        .confirmacion-orquidea-der {
          bottom: -40px;
          right: -60px;
          width: 180px;
          transform: scaleX(-1) rotate(10deg);
          z-index: 1;
        }
        .lluvia-sobres-container {
          position: relative;
          margin: 3rem auto 0 auto;
          max-width: 600px;
        }
        .lluvia-sobres-card {
          background: rgba(228, 132, 151, 0.85);
          border-radius: 28px;
          padding: 2.5rem 1.5rem 2.5rem 1.5rem;
          text-align: center;
          position: relative;
          box-shadow: 0 8px 32px #b43b35;
          
        }
        .lluvia-sobres-titulo {
          font-family: 'Beckan', Arial, sans-serif;
          font-size: 2.5rem;
          color: #ffcce2;
          margin-bottom: 0.05rem;
          font-weight: bold;
          letter-spacing: 0.08em;
        }
        .lluvia-sobres-texto {
          font-family: 'Bellerose', Arial, sans-serif;
          font-size: 1.4rem;
          color: #ffcce2;
          margin-bottom: 1.2rem;
          line-height: 1;
        }
        .lluvia-esquina {
          position: absolute;
          width: 70px;
          height: auto;
          opacity: 0.7;
          pointer-events: none;
        }
        .lluvia-esquina-izq-arriba {
          top: -18px;
          left: -18px;
          transform: rotate(0deg);
        }
        .lluvia-esquina-der-arriba {
          top: -18px;
          right: -18px;
          transform: scaleX(-1);
        }
        .lluvia-esquina-izq-abajo {
          bottom: -18px;
          left: -18px;
          transform: scaleY(-1);
        }
        .lluvia-esquina-der-abajo {
          bottom: -18px;
          right: -18px;
          transform: scaleX(-1) scaleY(-1);
        }
        @media (max-width: 600px) {
          .vestimenta-titulo { font-size: 2rem; }
          .vestimenta-subtitulo { font-size: 1.2rem; }
          .vestimenta-iconos { gap: 1.5rem; }
          .vestimenta-icono img { width: 70px; }
          .vestimenta-texto { font-size: 1rem; }
          .vestimenta-subtexto { font-size: 1rem; }
          .vestimenta-circulo { width: 18px; height: 18px; }
        }
        @media (max-width: 700px) {
          .confirmacion-card { max-width: 98vw; padding: 1.2rem 0.5rem 2rem 0.5rem; }
          .confirmacion-titulo { font-size: 2rem; }
          .confirmacion-texto { font-size: 1.1rem; }
          .confirmacion-btn { font-size: 1rem; padding: 0.8rem 1.2rem; }
          .confirmacion-orquidea-izq, .confirmacion-orquidea-der { width: 110px; }
          .lluvia-sobres-container { max-width: 98vw; }
          .lluvia-sobres-card { padding: 1.2rem 0.5rem 1.2rem 0.5rem; }
          .lluvia-sobres-titulo { font-size: 1.5rem; }
          .lluvia-sobres-texto { font-size: 1rem; }
          .lluvia-esquina { width: 40px; }
        }
        `}</style>

        {/* Sección de fotos */}
        <div className="fotos-evento-container">
          <h2 className="fotos-titulo beckan-font">Comparte tus fotos<br />del evento</h2>
          <div className="fotos-botones">
            <button className="fotos-btn fotos-btn-subir" onClick={() => setShowPhotoModal(true)}>SUBIR FOTOS</button>
            <button className="fotos-btn fotos-btn-galeria" onClick={() => navigate('/gallery')}>VER GALERÍA</button>
          </div>
          <h2 className="fotos-titulo beckan-font" style={{ marginTop: '2.5rem' }}>Fotos compartidas</h2>
          <div className="fotos-galeria">
            {loadingPhotos ? (
              <div style={{ color: '#a44a54', fontFamily: 'Beckan', fontSize: '1.2rem' }}>Cargando fotos...</div>
            ) : (
              uploadedPhotos.slice(0, 4).map(photo => (
                <div className="foto-card" key={photo.id} style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={photo.url} alt={photo.userName} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '16px 16px 0 0' }} />
                  <div style={{ fontFamily: 'Beckan', color: '#a44a54', fontSize: '1rem', marginTop: '0.5rem' }}>{photo.userName}</div>
                  <div style={{ fontFamily: 'Bellerose', color: '#a44a54', fontSize: '0.8rem' }}>{photo.uploadDate}</div>
                </div>
              ))
            )}
          </div>
        </div>
        <style>{`
        .fotos-evento-container {
          text-align: center;
          margin: 3rem auto 0 auto;
          max-width: 700px;
        }
        .fotos-titulo {
          font-family: 'Beckan', Arial, sans-serif !important;
          font-size: 2.5rem;
          color: #a44a54;
          margin-bottom: 1.5rem;
          font-weight: bold;
        }
        .fotos-botones {
          display: flex;
          justify-content: center;
          gap: 2.5rem;
          margin-bottom: 2.5rem;
        }
        .fotos-btn {
          font-family: 'FuturaBook't;
          font-size: 1rem;
          text-transform: uppercase;
          border: none;
          border-radius: 16px;
          padding: 1.2rem;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(172,57,57,0.12);
          transition: background 0.2s, color 0.2s;
        }
        .fotos-btn-subir {
          background: #ac3939;
          color: rgba(228, 132, 151);
        }
        .fotos-btn-galeria {
          background: rgba(228, 132, 151, 0.85);
          color: #a44a54;
        }
        .fotos-galeria {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 2rem;
        }
        .foto-card {
          background: #ffd0d8;
          border-radius: 18px;
          width: 260px;
          height: 180px;
          box-shadow: 0 2px 8px rgba(172,57,57,0.08);
          display: inline-block;
          margin-bottom: 2rem;
        }
        @media (max-width: 700px) {
          .fotos-evento-container { max-width: 98vw; }
          .fotos-titulo { font-size: 1.5rem; }
          .fotos-btn { font-size: 1rem; padding: 0.8rem 1.2rem; }
          .fotos-galeria { gap: 1rem; }
          .foto-card { width: 120px; height: 90px; }
        }
        `}</style>

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
          font-display: swap;
        }
        @font-face {
          font-family: 'Beckan Regular';
          src: url('/fuentes/Beckan.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'FuturaBook';
          src: url('/fuentes/FuturaBook.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
        .ubicacion-beckan {
          font-family: 'Beckan', 'Beckan Regular', Arial, sans-serif !important;
          font-size: 2rem;
          color: #c2185b;
          letter-spacing: 0.05em;
        }
        .parrafo-bellerose {
          font-family: 'Bellerose', cursive;
          font-size: 1.3rem;
          color: #b43b35;
          text-align: center;
          margin-bottom: 1.2rem;
          line-height: 1.3;
        }
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
        
        .countdown {
          background: #AC3939;
          color: #f7d6d6;
          border-radius: 8px;
          padding: 24px 0 16px 0;
          text-align: center;
          margin: 0 auto 16px auto;
          width: 100%;
          max-width: 480px;
          font-family: 'Bellerose', Arial, sans-serif;
          box-sizing: border-box;
        }
        .countdown-label {
          font-size: 1.3rem;
          letter-spacing: 0.3em;
          margin-bottom: 8px;
          font-family: 'Bellerose', Arial, sans-serif;
          color: #f7d6d6;
        }
        .countdown-values {
          font-size: 2rem;
          font-family: 'Bellerose', Arial, sans-serif;
          font-weight: normal;
          color: #f7d6d6;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.2em;
        }
        .countdown-bold {
          font-weight: bold;
          font-family: 'Bellerose', Arial, sans-serif;
          color: #f7d6d6;
        }
        .countdown-sep {
          font-size: 2rem;
          margin: 0 0.2em;
          color: #f7d6d6;
        }
        .orquidea5-img {
          position: absolute;
          top: -30px;
          right: -40px;
          width: 120px;
          z-index: 2;
          pointer-events: none;
        }
        .beckan-font {
          font-family: 'Beckan', Arial, sans-serif !important;
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