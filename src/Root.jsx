import React from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from './AppRouter';
import './index.css';

function Root() {
  return (
    <React.StrictMode>
      <AppRouter />
    </React.StrictMode>
  );
}

export default Root;
