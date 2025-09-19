import React, { useState } from 'react';
import Swal from 'sweetalert2';

const ConfirmationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    mensaje: '',
  acompanantes: '0'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isNoAsistire = formData.mensaje === 'No podré asistir';

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validaciones
    if (!formData.nombre.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo requerido',
        text: 'Por favor ingresa tu nombre completo.',
        background: '#fff0f6',
        color: '#b43b35',
        confirmButtonColor: '#e48497',
        customClass: {
          popup: 'swal-custom-popup',
          title: 'swal-custom-title',
          confirmButton: 'swal-custom-button'
        }
      });
      return;
    }
    if (!formData.telefono.match(/^\d{10}$/)) {
      Swal.fire({
        icon: 'warning',
        title: 'Teléfono inválido',
        text: 'El número de teléfono debe tener exactamente 10 dígitos.',
        background: '#fff0f6',
        color: '#b43b35',
        confirmButtonColor: '#e48497',
        customClass: {
          popup: 'swal-custom-popup',
          title: 'swal-custom-title',
          confirmButton: 'swal-custom-button'
        }
      });
      return;
    }
    if (formData.acompanantes === '' || formData.acompanantes === null) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo requerido',
        text: 'Por favor ingresa el número de acompañantes (puede ser 0).',
        background: '#fff0f6',
        color: '#b43b35',
        confirmButtonColor: '#e48497',
        customClass: {
          popup: 'swal-custom-popup',
          title: 'swal-custom-title',
          confirmButton: 'swal-custom-button'
        }
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
      const response = await fetch(`${API_BASE_URL}/confirmacion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error('Error en la respuesta del servidor');
      // Mensaje personalizado según la opción seleccionada
      if (formData.mensaje === 'Sí, asistiré') {
        Swal.fire({
          icon: 'success',
          title: '¡Gracias por confirmar tu asistencia 😊🎉!',
          html: 'Pronto nos vemos para seguir creando hermosos recuerdos juntos!',
          background: '#fff0f6',
          color: '#b43b35',
          confirmButtonColor: '#e48497',
          customClass: {
            popup: 'swal-custom-popup',
            title: 'swal-custom-title',
            confirmButton: 'swal-custom-button'
          }
        }).then(() => onClose());
      } else if (formData.mensaje === 'No podré asistir') {
        Swal.fire({
          icon: 'info',
          title: '😔 Lamentamos que no nos puedas acompañar',
          html: 'Si llegas a cambiar de opinión avísanos al <b>3132142789</b>',
          background: '#fff0f6',
          color: '#b43b35',
          confirmButtonColor: '#e48497',
          customClass: {
            popup: 'swal-custom-popup',
            title: 'swal-custom-title',
            confirmButton: 'swal-custom-button'
          }
        }).then(() => onClose());
      } else {
        Swal.fire({
          icon: 'success',
          title: '¡Confirmación enviada exitosamente!',
          background: '#fff0f6',
          color: '#b43b35',
          confirmButtonColor: '#e48497',
          customClass: {
            popup: 'swal-custom-popup',
            title: 'swal-custom-title',
            confirmButton: 'swal-custom-button'
          }
        }).then(() => onClose());
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al enviar tu confirmación. Por favor intenta de nuevo.',
        background: '#fff0f6',
        color: '#b43b35',
        confirmButtonColor: '#e48497',
        customClass: {
          popup: 'swal-custom-popup',
          title: 'swal-custom-title',
          confirmButton: 'swal-custom-button'
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, #ffa8c5 0%, #fff0f6 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: '#fff0f6',
        borderRadius: '28px',
        padding: '2.5rem 2rem 2.5rem 2rem',
        maxWidth: '520px',
        width: '100%',
  maxHeight: '90vh',
  overflowY: 'auto',
  scrollbarWidth: 'thin',
  scrollbarColor: '#e48497 #fff0f6',
        position: 'relative',
        boxShadow: '0 8px 32px #e48497',
        border: '2.5px solid #e48497'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{
            fontFamily: 'Beckan, Arial, sans-serif',
            fontSize: '2.7rem',
            color: '#e48497',
            margin: '0 0 1.5rem 0',
            fontWeight: 'bold',
            letterSpacing: '0.07em',
            textShadow: '0 2px 8px #fff0f6'
          }}>
            Confirma tu Asistencia
          </h2>
        </div>
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          <div>
            <label style={{
              display: 'block',
              fontFamily: 'Bellerose, Arial, sans-serif',
              fontSize: '1.25rem',
              color: '#e48497',
              marginBottom: '0.5rem',
              fontWeight: 'bold',
              letterSpacing: '0.03em'
            }}>
              Nombre completo *
            </label>
            <input
              type="text"
              required
              value={formData.nombre}
              onChange={(e) => handleChange('nombre', e.target.value)}
              style={{
                width: '90%',
                padding: '0.5rem',
                borderRadius: '22px',
                border: '2px solid #e48497',
                fontFamily: 'Bellerose, Arial, sans-serif',
                fontSize: '1rem',
                background: '#ffd6e3',
                color: '#b43b35',
                marginBottom: '0.5rem',
                boxShadow: '0 1px 4px #e48497'
              }}
              placeholder="Nombre completo"
            />
          </div>
          <div>
            <label style={{
              display: 'block',
              fontFamily: 'Bellerose, Arial, sans-serif',
              fontSize: '1.25rem',
              color: '#e48497',
              marginBottom: '0.5rem',
              fontWeight: 'bold',
              letterSpacing: '0.03em'
            }}>
              Teléfono (10 dígitos) *
            </label>
            <input
              type="tel"
              required
              value={formData.telefono}
              onChange={(e) => handleChange('telefono', e.target.value)}
              style={{
                width: '90%',
                padding: '0.5rem',
                borderRadius: '22px',
                border: '2px solid #e48497',
                fontFamily: 'Bellerose, Arial, sans-serif',
                fontSize: '1rem',
                background: '#ffd6e3',
                color: '#b43b35',
                marginBottom: '0.5rem',
                boxShadow: '0 1px 4px #e48497'
              }}
              placeholder="3001234567"
            />
          </div>
          <div>
            <label style={{
              display: 'block',
              fontFamily: 'Bellerose, Arial, sans-serif',
              fontSize: '1.25rem',
              color: '#e48497',
              marginBottom: '0.5rem',
              fontWeight: 'bold',
              letterSpacing: '0.03em'
            }}>
              ¿Confirmas tu asistencia? *
            </label>
            <select
              required
              value={formData.mensaje}
              onChange={(e) => handleChange('mensaje', e.target.value)}
              style={{
                width: '90%',
                padding: '0.5rem',
                borderRadius: '22px',
                border: '2px solid #e48497',
                fontFamily: 'Bellerose, Arial, sans-serif',
                fontSize: '1rem',
                background: '#ffd6e3',
                color: '#b43b35',
                marginBottom: '0.5rem',
                boxShadow: '0 1px 4px #e48497'
              }}
            >
              <option value="">Selecciona una opción</option>
              <option value="Sí, asistiré">Sí, asistiré</option>
              <option value="No podré asistir">No podré asistir</option>
            </select>
          </div>
          <div>
            <label style={{
              display: 'block',
              fontFamily: 'Bellerose, Arial, sans-serif',
              fontSize: '1.25rem',
              color: '#e48497',
              marginBottom: '0.5rem',
              fontWeight: 'bold',
              letterSpacing: '0.03em'
            }}>
              Número de acompañantes
            </label>
            <input
              type="number"
              min="0"
              value={formData.acompanantes}
              onChange={(e) => handleChange('acompanantes', e.target.value)}
              style={{
                width: '90%',
                padding: '0.5rem',
                borderRadius: '22px',
                border: '2px solid #e48497',
                fontFamily: 'Bellerose, Arial, sans-serif',
                fontSize: '1rem',
                background: isNoAsistire ? '#f3f3f3' : '#ffd6e3',
                color: isNoAsistire ? '#aaa' : '#b43b35',
                marginBottom: '0.5rem',
                boxShadow: '0 1px 4px #e48497'
              }}
              placeholder="0"
              disabled={isNoAsistire}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              background: 'linear-gradient(135deg, #e48497 0%, #ffa8c5 100%)',
              color: '#fff',
              border: 'none',
              padding: '0.9rem',
              borderRadius: '22px',
              cursor: 'pointer',
              fontSize: '1.15rem',
              fontFamily: 'Bellerose, Arial, sans-serif',
              fontWeight: 'bold',
              marginTop: '1rem',
              boxShadow: '0 2px 12px #e48497',
              letterSpacing: '0.04em',
              transition: 'background 0.3s, box-shadow 0.3s',
              opacity: isSubmitting ? 0.7 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isSubmitting ? 'Enviando...' : 'Confirmar Asistencia'}
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: '#ffd6e3',
              color: '#b43b35',
              border: '2px solid #e48497',
              borderRadius: '22px',
              padding: '0.7rem',
              fontSize: '1rem',
              fontFamily: 'Bellerose, Arial, sans-serif',
              fontWeight: 'bold',
              marginTop: '0.7rem',
              cursor: 'pointer',
              boxShadow: '0 1px 4px #e48497',
              transition: 'background 0.3s, box-shadow 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            Cerrar
          </button>
        </form>
      </div>
    </div>
  );
}
// Estilos personalizados para SweetAlert2
const style = document.createElement('style');
style.innerHTML = `
  .swal-custom-popup {
    border-radius: 28px !important;
    font-family: 'Bellerose', Arial, sans-serif !important;
    box-shadow: 0 8px 32px #e48497 !important;
    border: 2.5px solid #e48497 !important;
  }
  .swal-custom-title {
    color: #e48497 !important;
    font-family: 'Beckan', Arial, sans-serif !important;
    font-size: 2rem !important;
    font-weight: bold !important;
    letter-spacing: 0.07em !important;
    text-shadow: 0 2px 8px #fff0f6 !important;
  }
  .swal-custom-button {
    background: linear-gradient(135deg, #e48497 0%, #ffa8c5 100%) !important;
    color: #fff !important;
    border-radius: 22px !important;
    font-family: 'Bellerose', Arial, sans-serif !important;
    font-size: 1.15rem !important;
    font-weight: bold !important;
    box-shadow: 0 2px 12px #e48497 !important;
    letter-spacing: 0.04em !important;
    border: none !important;
    padding: 0.9rem 2.2rem !important;
  }
`;
document.head.appendChild(style);

export default ConfirmationModal;