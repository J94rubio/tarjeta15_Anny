# 🎉 Invitación Digital - 15 Años de Anny Tatiana Rubio Duque

Sistema completo de invitación digital para celebrar los 15 años de Anny con:
- ✨ Invitación elegante con fotos
- 📸 Sistema de subida de fotos
- 📊 Confirmaciones automáticas en Google Sheets
- 🎨 Galería de fotos con navegación

## 🚀 Instalación y Uso

### 1. Frontend (React + Vite)
```bash
npm install
npm run dev
```
**Acceso:** http://localhost:3000

### 2. Backend (Express + MongoDB + Google Sheets)
```bash
cd backend
npm install
node server.js
```
**Acceso:** http://localhost:3001

## 📁 Estructura del Proyecto

### Frontend:
- `src/App.jsx` - Componente principal con invitación
- `src/PhotoUploader.jsx` - Componente para subir fotos
- `src/PhotoUploadModal.jsx` - Modal elegante para fotos
- `src/PhotoGalleryPage.jsx` - Galería completa con navegación
- `src/AppRouter.jsx` - Sistema de navegación

### Backend:
- `server.js` - Servidor principal con API
- `googleSheetsService.js` - Integración con Google Sheets
- `credentials.json` - Credenciales de Google Cloud (NO COMPARTIR)

## 🔧 Configuración Requerida

### Google Sheets:
1. Crear hoja de cálculo con ID: `1PmYO433SJmqkh1G6wAHj7rABrZD3m9J3bDQEK9468Ns`
2. Dar permisos a: `confirmacion@album-15-anny-471517.iam.gserviceaccount.com`
3. Credenciales en `backend/credentials.json`

### MongoDB Atlas:
- Configurado automáticamente en el código
- Base de datos: `eventPhotosDB`
- Colecciones: `photos`, `confirmaciones`

## 🎯 Funcionalidades

- **Invitación Digital**: Diseño elegante con información del evento
- **Galería de Fotos**: Sistema completo de subida y visualización
- **Confirmaciones**: Formulario que guarda en Google Sheets automáticamente
- **Navegación**: Galería completa con controles de teclado y mouse

## 📅 Información del Evento

- **Fecha:** 29 de noviembre de 2025
- **Hora:** 7:00 PM
- **Lugar:** Cl 17 Sur #22 - 37
- **Quinceañera:** Anny Tatiana Rubio Duque

---
*Sistema desarrollado para la celebración de los 15 años de Anny* 🎊+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
