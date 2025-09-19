# 🎉 Tarjeta de 15 Años - Anny

## 🚀 Despliegue en Vercel

### Pasos para desplegar:

1. **Subir el código a un repositorio de GitHub** (si no lo has hecho)
   ```bash
   git add .
   git commit -m "Configuración para deployment en Vercel"
   git push origin main
   ```

2. **Conectar con Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Conecta tu cuenta de GitHub
   - Selecciona este repositorio
   - Vercel detectará automáticamente que es un proyecto Vite

3. **Variables de entorno en Vercel:**
   - En el dashboard de Vercel, ve a Settings → Environment Variables
   - Agrega esta variable:
     - `VITE_API_BASE_URL` = `https://backend-tarjeta-15.onrender.com/api`

4. **Deploy automático:**
   - Vercel desplegará automáticamente
   - Cada push a main activará un nuevo deployment

### 🛠️ Configuración Local

Para desarrollo local:
```bash
npm install
npm run dev
```

### 📋 Backend

El backend está desplegado en: https://backend-tarjeta-15.onrender.com

### 🔧 Estructura de Variables de Entorno

- `.env` - Para desarrollo local
- `.env.production` - Para producción (solo referencia, no se usa en build)
- `vercel.json` - Configuración específica para Vercel con variables de entorno

### 📱 Funcionalidades

- ✅ Galería de fotos en tiempo real
- ✅ Subida de fotos por invitados
- ✅ Conexión con MongoDB Atlas
- ✅ Interfaz responsiva
- ✅ Música de fondo

### 🌐 URLs

- **Frontend (Vercel):** Se asignará después del deployment
- **Backend (Render):** https://backend-tarjeta-15.onrender.com
- **API Endpoint:** https://backend-tarjeta-15.onrender.com/api