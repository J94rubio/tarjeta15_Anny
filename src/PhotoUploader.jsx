import React, { useState } from 'react';

function PhotoUploader({ onPhotosUploaded }) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFileUpload = async (files) => {
    setUploading(true);
    const uploadedPhotos = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          uploadedPhotos.push({
            url: e.target.result,
            name: file.name,
            size: file.size
          });
          
          if (uploadedPhotos.length === files.length) {
            onPhotosUploaded(uploadedPhotos);
            setUploading(false);
          }
        };
        reader.readAsDataURL(file);
      }
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
          <div> Subiendo fotos...</div>
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
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}></div>
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
