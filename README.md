# 🛰️ Orbit All-in-One 2.026

**Sistema integral de gestión de bankroll para poker profesional y streaming**

![Version](https://img.shields.io/badge/version-2.026-brightgreen)
![License](https://img.shields.io/badge/license-Private-red)
![Firebase](https://img.shields.io/badge/Firebase-8.10.0-orange)
![Status](https://img.shields.io/badge/status-Alpha-yellow)

---

## 🎯 Descripción

**Orbit Systems** es una aplicación web avanzada diseñada para jugadores profesionales de poker que necesitan:

- 📊 **Gestión precisa de bankroll** en tiempo real
- 🎙️ **Control por voz** con IA (Groq, OpenAI, Gemini)
- 📈 **Análisis inteligente** de varianza y riesgo
- 🎮 **Interfaz multi-sala** para torneos y cash games
- 📡 **Modo Streamer** con overlays en vivo

---

## ✨ Características Principales

### 🎤 **Sistema de Voz Avanzado**
- Reconocimiento de voz nativo y cloud (Whisper/Groq)
- Modo "Always Listening" (estilo Alexa)
- Comandos personalizados
- Feedback visual en tiempo real

### 📊 **Business Intelligence**
- Auditoría de cuentas multi-sala
- Simulaciones Monte Carlo de riesgo
- Análisis de varianza profesional
- Reportes automáticos (CSV/PDF)

### 🔐 **Seguridad & Cloud**
- Autenticación Firebase
- Persistencia en Firestore
- Encriptación de API keys
- Backups automáticos

---

## 🚀 Quick Start

### 1. Configuración Básica

```bash
# Clonar repositorio
git clone https://github.com/srtorresredes/Orbit-Bankrollmanager-poker-stream-app.git

# Navegar al directorio
cd Orbit-Bankrollmanager-poker-stream-app
```

### 2. Configurar API Keys

```bash
# Copiar template de configuración
cp config.example.js config.js

# Editar con tus credenciales
# Obtén las keys desde:
# - Firebase: https://console.firebase.google.com/
# - Groq: https://console.groq.com/keys
# - OpenAI: https://platform.openai.com/api-keys
```

### 3. Ejecutar

```bash
# Opción 1: Python HTTP Server
python -m http.server 5500

# Opción 2: Live Server (VSCode)
# Click derecho en index.html → Open with Live Server

# Abrir en navegador
http://localhost:5500
```

---

## 📂 Estructura del Proyecto

```
orbit-systems/
├── index.html                  # Dashboard principal
├── landing.html                # Página landing
├── colaboracion.html           # Formulario de registro Alpha
├── config.js                   # ⚠️ TUS API KEYS (NO SUBIR A GIT)
├── config.example.js           # Plantilla de configuración
├── .gitignore                  # Archivos excluidos de Git
├── README_CONFIG.md            # Guía de configuración detallada
│
├── js/
│   ├── core/
│   │   ├── voice-commands.js   # Sistema de comandos de voz
│   │   ├── ai-voice-processor.js # Procesador IA multi-provider
│   │   ├── always-listening.js  # Modo "Always Listening"
│   │   ├── logic-core.js       # Lógica de negocio
│   │   ├── config-loader.js    # Cargador automático de API keys
│   │   └── startup.js          # Inicialización
│   │
│   ├── services/
│   │   ├── firebase-init.js    # Inicialización Firebase
│   │   ├── alpha-registration.js # Registro de usuarios Alpha
│   │   └── persistence.js      # Sistema de persistencia
│   │
│   ├── features/
│   │   ├── voice-traffic-light.js # Semáforo de voz visual
│   │   ├── orbit-widget-v2.js     # Widget V-STAT
│   │   └── reports-engine.js      # Motor de reportes BI
│   │
│   └── modules/
│       ├── settings/           # Controladores de configuración
│       └── auth/               # Autenticación
│
└── css/
    ├── styles.css              # Estilos principales
    ├── orbit-chat.css          # Chat de voz
    └── voice-toggle.css        # Controles de voz
```

---

## 🎮 Uso del Sistema de Voz

### Modo MANUAL (Hold-to-Talk)
1. Mantén presionada la tecla **N**
2. Di tu comando (ej: "Abrir configuración")
3. Suelta la tecla
4. El sistema procesa y ejecuta

### Modo IA (Always Listening)
1. Activa el toggle **IA/MANUAL** en la taskbar
2. Di la palabra clave: **"Orbit"**
3. Espera el beep de activación
4. Di tu comando
5. El sistema responde automáticamente

### Comandos Disponibles
```
- "Añadir mesa de 50 euros"
- "Bounty de 25"
- "Abrir configuración"
- "Cerrar todo"
- "¿Cuánto llevo?"
- "Finalizar sesión"
```

---

## 🔧 Configuración Avanzada

### Firebase Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Colección usuarios_alpha (registro público)
    match /usuarios_alpha/{userId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    
    // Colección users (solo usuarios autenticados)
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Providers de IA Soportados

| Provider | Uso | API Key Requerida |
|----------|-----|-------------------|
| **Local** | Comandos básicos | No |
| **Groq** | Voz ultra-rápida | Sí ([obtener](https://console.groq.com/keys)) |
| **OpenAI** | GPT-4 + Whisper | Sí ([obtener](https://platform.openai.com/api-keys)) |
| **Gemini** | Google AI | Sí ([obtener](https://aistudio.google.com/app/apikey)) |

---

## 📱 Landing & Formulario de Captación

### Landing Page (`landing.html`)
- Diseño ciberpunk premium
- Responsive (móvil, tablet, desktop)
- Integración con redes sociales
- CTA para registro Alpha

### Formulario de Colaboración (`colaboracion.html`)
- Registro en Firestore automático
- Validación de email
- Selección de áreas de interés
- Modales estilo ciberpunk
- Feedback visual en tiempo real

**Áreas de Interés:**
- 📊 Bankroll Manager
- 🧪 Beta Tester
- 📡 Stream & Content
- 🌀 Propuesta Libre

---

## 🛡️ Seguridad

### ⚠️ Archivos Sensibles (NO SUBIR A GIT)

```gitignore
config.js
**/config.js
.env
.env.local
firebase-debug.log
node_modules/
```

### 🔐 Encriptación

Las API keys se encriptan automáticamente usando `SecurityUtils` antes de guardarse en `localStorage`.

---

## 📊 Roadmap

- [x] Sistema de voz multi-provider
- [x] Integración Firebase
- [x] Landing page profesional
- [x] Formulario de registro Alpha
- [x] Sistema de configuración centralizado
- [ ] Panel de administración de usuarios Alpha
- [ ] Integración con Twitch/YouTube OBS
- [ ] App móvil (React Native)
- [ ] Plugin HUD para salas de poker
- [ ] Marketplace de comandos personalizados

---

## 🛰️ ORBIT ALL-IN-ONE POKER & STREAM MANAGER

## 🚀 Guía de Despliegue Rápido (Quick Install)

### 1. Requisitos Previos
*   Navegador basado en Chromium (Chrome, Edge, Brave) actualizado.
*   Micrófono activo para comandos de voz.
*   (Opcional) OBS Studio para integración de Overlays.

### 2. Acceso al Sistema
1.  Visita el **[Portal Oficial Alpha](https://srtorresredes.github.io/ORBIT-ALL-IN-ONE-WEB/)**.
2.  Haz clic en **"Solicitar Ingreso a la Alpha Unit"**.
3.  Completa el formulario de perfilado técnico (Stakes, Software, Stream).

### 3. Instalación PWA (App de Escritorio)
Para una experiencia nativa sin barra de navegación:
1.  En Chrome/Edge, pulsa el icono de **"Instalar"** (⊕) en la barra de direcciones.
2.  O ve al menú (⋮) > **"Instalar Orbit All-in-One..."**.
3.  La app se abrirá en una ventana dedicada con acceso directo en tu escritorio.

### 4. Integración con OBS (Streamers)
1.  En OBS, añade una nueva fuente: **Navegador (Browser Source)**.
2.  URL: `https://srtorresredes.github.io/ORBIT-ALL-IN-ONE-WEB/overlay_obs.html`
3.  Dimensiones: `Ancho: 100%`, `Alto: 100%` (o ajusta al HUD deseado).
4.  Marca **"Actualizar navegador cuando la escena se active"**.
5.  *Tip:* Usa el filtro "Color Key" en OBS para eliminar el fondo negro si deseas transparencia total.

---
**Protocolo de Soporte:**
Cualquier anomalía debe ser reportada en el canal oficial de Telegram: **[@OrbitAlphaComunidad](https://t.me/OrbitAlphaComunidad)**.

## 🤝 Contribución

**Actualmente en fase Alpha privada.** Si quieres colaborar:

1. Visita [colaboracion.html](https://srtorresredes.github.io/Orbit-Bankrollmanager-poker-stream-app/colaboracion.html)
2. Completa el formulario de registro
3. El equipo revisará tu solicitud

---

## 📄 Licencia

**Uso privado.** Prohibida la distribución sin autorización.

© 2026 ORBIT SYSTEMS // AD ASTRA PER ASPERA

---

## 📞 Contacto

- **GitHub:** [@srtorresredes](https://github.com/srtorresredes)
- **Email:** bankrollmanager@gmx.com
- **Proyecto:** [Orbit Bankroll Manager](https://github.com/srtorresredes/Orbit-Bankrollmanager-poker-stream-app)

---

**🛰️ ORBIT ALL-IN-ONE 2.026** - *Poker. Streaming. Dominance.*
