import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import PhotoGalleryPage from './PhotoGalleryPage';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/gallery" element={<PhotoGalleryPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
