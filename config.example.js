/**
 * ORBIT CONFIG TEMPLATE
 * 
 * INSTRUCCIONES:
 * 1. Copia este archivo como "config.js" en la misma carpeta
 * 2. Rellena tus API Keys reales en config.js
 * 3. NUNCA subas config.js a GitHub (ya está en .gitignore)
 * 
 * IMPORTANTE: Este archivo es solo una plantilla de ejemplo.
 * El archivo real "config.js" contendrá tus claves privadas.
 */

const ORBIT_CONFIG = {
    // Firebase Configuration
    firebase: {
        apiKey: "TU_FIREBASE_API_KEY_AQUI",
        authDomain: "tu-proyecto.firebaseapp.com",
        projectId: "tu-proyecto-id",
        storageBucket: "tu-proyecto.appspot.com",
        messagingSenderId: "123456789",
        appId: "1:123456789:web:abcdef123456"
    },

    // Groq API Configuration
    groq: {
        apiKey: "gsk_TU_GROQ_API_KEY_AQUI"
    },

    // OpenAI API Configuration (opcional)
    openai: {
        apiKey: "sk-TU_OPENAI_API_KEY_AQUI"
    },

    // Gemini API Configuration (opcional)
    gemini: {
        apiKey: "TU_GEMINI_API_KEY_AQUI"
    }
};

// Export global para acceso desde cualquier script
window.ORBIT_CONFIG = ORBIT_CONFIG;
