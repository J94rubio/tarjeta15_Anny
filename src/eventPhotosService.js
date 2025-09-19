// Servicio para cargar fotos desde MongoDB Atlas
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export const loadEventPhotos = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/fotos`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const photos = await response.json();
    
    if (photos.length === 0) {
      // Si no hay fotos en MongoDB, mostrar fotos de ejemplo
      return [
        {
          id: 'ejemplo1',
          url: 'https://images.unsplash.com/photo-1464047736614-af63643285bf?w=300&h=200&fit=crop',
          userName: 'Fotos de ejemplo',
          uploadDate: 'Pronto habrá fotos reales aquí'
        },
        {
          id: 'ejemplo2',
          url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&h=200&fit=crop',
          userName: 'Fotos de ejemplo',
          uploadDate: 'Los invitados subirán sus fotos'
        },
        {
          id: 'ejemplo3',
          url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=300&h=200&fit=crop',
          userName: 'Fotos de ejemplo',
          uploadDate: 'Galería en tiempo real'
        }
      ];
    }
    
    console.log(`✅ ${photos.length} fotos cargadas desde MongoDB`);
    return photos;
    
  } catch (error) {
    console.error('❌ Error conectando con MongoDB:', error);
    
    // Si hay error de conexión, mostrar fotos de ejemplo
    return [
      {
        id: 'fallback1',
        url: 'https://images.unsplash.com/photo-1464047736614-af63643285bf?w=300&h=200&fit=crop',
        userName: 'Sin conexión',
        uploadDate: 'Verificar servidor backend'
      },
      {
        id: 'fallback2',
        url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&h=200&fit=crop',
        userName: 'Sin conexión',
        uploadDate: 'Servidor MongoDB no disponible'
      }
    ];
  }
};

// Función para subir una foto a MongoDB
export const uploadPhotoToMongoDB = async (file, userName, descripcion = '') => {
  try {
    const formData = new FormData();
    formData.append('photo', file);
    formData.append('userName', userName);
    formData.append('descripcion', descripcion);
    
    const response = await fetch(`${API_BASE_URL}/fotos/subir`, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error subiendo foto');
    }
    
    const result = await response.json();
    console.log('✅ Foto subida exitosamente:', result);
    return result;
    
  } catch (error) {
    console.error('❌ Error subiendo foto:', error);
    throw error;
  }
};

// Función para obtener estadísticas de fotos
export const getPhotoStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/fotos/stats`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const stats = await response.json();
    return stats;
    
  } catch (error) {
    console.error('❌ Error obteniendo estadísticas:', error);
    return {
      totalPhotos: 0,
      totalUsers: 0,
      totalSize: 0,
      latestPhoto: null
    };
  }
};

// Función para refrescar las fotos (llamar para actualizar galería)
export const refreshPhotos = async () => {
  try {
    const photos = await loadEventPhotos();
    return photos;
  } catch (error) {
    console.error('❌ Error refrescando fotos:', error);
    return [];
  }
};
