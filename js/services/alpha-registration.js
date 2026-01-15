/**
 * ORBIT ALPHA REGISTRATION MODULE
 * Sistema de registro para formulario de captación de usuarios Alpha
 * Usa Firebase Firestore para almacenar leads
 */

(function () {
    'use strict';

    console.log('🚀 [ALPHA REGISTRATION] Module loaded');

    /**
     * Registra un usuario en la colección "usuarios_alpha" de Firestore
     * @param {string} email - Email del usuario
     * @param {object} additionalData - Datos adicionales (nombre, telegram, áreas_interes, etc.)
     * @returns {Promise} - ID del documento creado en Firestore
     */
    window.handleRegistroAlpha = async function (email, additionalData = {}) {
        console.log('📧 [ALPHA] Intentando registrar:', email);

        // Verificar que Firebase esté disponible
        if (typeof firebase === 'undefined') {
            const errorMsg = 'Firebase SDK no está cargado. Verifica que los scripts de Firebase estén incluidos.';
            console.error('❌ [ALPHA]', errorMsg);
            showCyberpunkAlert('ERROR DE SISTEMA', errorMsg, 'error');
            throw new Error(errorMsg);
        }

        // Inicializar Firebase si no está inicializado
        if (!firebase.apps.length) {
            // Intentar usar config desde window.ORBIT_CONFIG
            let config = window.ORBIT_CONFIG?.firebase || window.firebaseConfig;

            if (!config) {
                const errorMsg = 'Configuración de Firebase no encontrada. Configura config.js primero.';
                console.error('❌ [ALPHA]', errorMsg);
                showCyberpunkAlert('ERROR DE CONFIGURACIÓN', errorMsg, 'error');
                throw new Error(errorMsg);
            }

            try {
                firebase.initializeApp(config);
                console.log('✅ [ALPHA] Firebase inicializado');
            } catch (e) {
                console.error('❌ [ALPHA] Error al inicializar Firebase:', e);
                throw e;
            }
        }

        const db = firebase.firestore();

        try {
            // Crear documento en Firestore
            const docRef = await db.collection("usuarios_alpha").add({
                email: email,
                ...additionalData,
                fecha_registro: firebase.firestore.FieldValue.serverTimestamp(),
                estado: "pendiente_alpha",
                origen: window.location.pathname
            });

            console.log("✅ [ALPHA] Usuario registrado con ID:", docRef.id);

            // Mostrar mensaje de éxito ciberpunk
            showCyberpunkAlert(
                '✅ ACCESO CONCEDIDO',
                `<div style="text-align: left; line-height: 1.8;">
                    <div style="margin-bottom: 15px; color: #0f9;">
                        <strong>REGISTRO EXITOSO</strong>
                    </div>
                    <div style="font-size: 13px; color: #ccc;">
                        • Email: <span style="color: #fff;">${email}</span><br>
                        • ID: <span style="color: #0ff;">${docRef.id}</span><br>
                        • Estado: <span style="color: #0f9;">PENDIENTE ALPHA</span>
                    </div>
                    <div style="margin-top: 20px; padding: 15px; background: rgba(0,255,157,0.1); border-left: 3px solid #0f9; border-radius: 4px;">
                        <div style="font-size: 11px; color: #0f9; font-weight: bold; margin-bottom: 5px;">📡 SIGUIENTE PASO:</div>
                        <div style="font-size: 12px; color: #aaa;">
                            Estás en la lista de ORBIT. El equipo revisará tu solicitud pronto.
                        </div>
                    </div>
                </div>`,
                'success'
            );

            return docRef.id;

        } catch (e) {
            console.error("❌ [ALPHA] Error al registrar:", e);

            let errorMessage = 'Error de conexión al servidor. Inténtalo de nuevo.';
            if (e.code === 'permission-denied') {
                errorMessage = 'Permisos insuficientes. Contacta al administrador.';
            } else if (e.code === 'unavailable') {
                errorMessage = 'Servidor no disponible. Verifica tu conexión.';
            }

            showCyberpunkAlert('ERROR DE CONEXIÓN', errorMessage, 'error');
            throw e;
        }
    };

    /**
     * Muestra un modal personalizado estilo ciberpunk
     * @param {string} title - Título del modal
     * @param {string} message - Mensaje (puede incluir HTML)
     * @param {string} type - 'success' o 'error'
     */
    function showCyberpunkAlert(title, message, type = 'success') {
        const modal = document.createElement('div');
        modal.className = 'cyberpunk-alert';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 999999;
            animation: fadeIn 0.3s ease-out;
        `;

        const box = document.createElement('div');
        box.style.cssText = `
            background: ${type === 'error' ? 'linear-gradient(145deg, #1a0505, #0a0000)' : 'linear-gradient(145deg, #051a05, #000a00)'};
            border: 2px solid ${type === 'error' ? '#ff3333' : '#00ff88'};
            box-shadow: 0 0 40px ${type === 'error' ? 'rgba(255, 51, 51, 0.4)' : 'rgba(0, 255, 136, 0.4)'}, 
                        inset 0 0 20px ${type === 'error' ? 'rgba(255, 0, 0, 0.05)' : 'rgba(0, 255, 0, 0.05)'};
            border-radius: 16px;
            padding: 40px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            position: relative;
            animation: slideDown 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        `;

        box.innerHTML = `
            <div style="
                font-family: 'Courier New', monospace;
                font-size: 14px;
                color: ${type === 'error' ? '#ff3333' : '#00ff88'};
                letter-spacing: 3px;
                margin-bottom: 20px;
                text-transform: uppercase;
                font-weight: bold;
            ">${title}</div>
            
            <div style="
                color: #fff;
                font-size: 14px;
                line-height: 1.6;
                margin-bottom: 30px;
            ">${message}</div>
            
            <button id="cyberpunk-close-btn" style="
                background: ${type === 'error' ? '#ff3333' : '#00ff88'};
                color: #000;
                border: none;
                padding: 12px 40px;
                border-radius: 6px;
                cursor: pointer;
                font-weight: bold;
                font-size: 13px;
                text-transform: uppercase;
                letter-spacing: 1px;
                transition: all 0.3s;
                box-shadow: 0 4px 15px ${type === 'error' ? 'rgba(255, 51, 51, 0.3)' : 'rgba(0, 255, 136, 0.3)'};
            ">CERRAR</button>
        `;

        modal.appendChild(box);
        document.body.appendChild(modal);

        // Evento cerrar
        document.getElementById('cyberpunk-close-btn').onclick = () => modal.remove();
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };

        // Auto-cerrar después de 10 segundos
        setTimeout(() => {
            if (document.body.contains(modal)) modal.remove();
        }, 10000);
    }

    // Añadir estilos de animación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideDown {
            from { 
                opacity: 0;
                transform: translateY(-50px) scale(0.9);
            }
            to { 
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        #cyberpunk-close-btn:hover {
            transform: translateY(-2px);
            filter: brightness(1.2);
        }
    `;
    document.head.appendChild(style);

})();
