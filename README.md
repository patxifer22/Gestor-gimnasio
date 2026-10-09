# 🏋️‍♂️ FitTrack - Gestor y Registro de Rutina de Gimnasio

Una aplicación móvil moderna diseñada como **PWA (Progressive Web App)** para planificar tu rutina semanal de entrenamiento en el gimnasio y llevar un registro minucioso de cada entrenamiento completado en tiempo real.

---

## 📱 Características Principales

### 1. 📅 Rutina Semanal Personalizable
- **Planificación de Lunes a Domingo**: Asigna a cada día un grupo muscular o sesión (ej. *Empuje*, *Tirón*, *Pierna*, *Torso*, *Cuerpo Completo* o *Descanso*).
- **Ejercicios Detallados**: Configura series, repeticiones objetivo, peso estimado, descansos en segundos y notas técnicas para cada ejercicio.
- **Reordenación y Gestión Rápida**: Mueve ejercicios arriba/abajo, duplícalos, edítalos o bórralos fácilmente.
- **Plantillas Predefinidas de 1 Clic**:
  - **Push / Pull / Legs (PPL)** - 6 días
  - **Torso / Pierna** - 4 días
  - **Full Body (Cuerpo Completo)** - 3 días

### 2. ⚡ Modo "Entrenar" en Tiempo Real (Live Workout Tracker)
- **Cronómetro de Sesión**: Visualiza el tiempo exacto que llevas entrenando.
- **Registro Serie a Serie**: Anota el peso levantado (kg) y repeticiones realizadas en cada serie.
- **Referencia del Historial**: Muestra automáticamente tu marca anterior en cada ejercicio para ayudarte a aplicar sobrecarga progresiva.
- **Temporizador de Descanso Automático**: Al marcar una serie como completada (`✓`), se inicia automáticamente una cuenta atrás flotante con avisos sonoros (Web Audio) y vibración cuando el descanso termina.
- **Flexibilidad Total**: Añade o quita series y añade ejercicios sobre la marcha.
- **Pantalla Activa**: durante la sesión se mantiene la pantalla encendida cuando el navegador lo permite (Screen Wake Lock API), para no desbloquear el móvil entre series.

### 3. 📊 Historial y Estadísticas de Entrenamientos
- **Métricas Globales**: Total de entrenamientos realizados, volumen total acumulado en kg, total de series y horas entrenadas.
- **Registro Cronológico Detallado**: Desglose completo de cada sesión pasada con series, repeticiones, cargas y notas.

### 4. 🔒 100% Offline y Privacidad de Datos
- **Sin necesidad de cuenta ni registro en internet**: Todos los datos se guardan en el almacenamiento local del dispositivo.
- **Copias de Seguridad**: Exporta e importa tus datos en formato `.json` cuando quieras para respaldar o transferir a otro teléfono.
- **Funcionamiento sin conexión**: El Service Worker integrado permite usar la app dentro del gimnasio incluso sin cobertura móvil ni Wi-Fi.

---

## 🚀 Cómo Ejecutar y Probar la App

### Opción 1: Con Python (Recomendado para PC y Móvil en la misma red)
1. Abre una terminal en la carpeta del proyecto y ejecuta:
   ```bash
   python server.py
   ```
2. El script te mostrará:
   - Para tu ordenador: `http://localhost:8000`
   - Para tu teléfono móvil (conectado a la misma red Wi-Fi): `http://<TU_IP_LOCAL>:8000`

### Opción 2: Abrir directamente
Puedes abrir directamente el archivo `index.html` con cualquier navegador web moderno (Chrome, Edge, Safari, Firefox).

> **Nota sobre la instalación como PWA:** los navegadores solo permiten instalar la app (y registrar el Service Worker, necesario para el modo offline) sobre **HTTPS** o en `localhost`. La URL `http://<IP-local>:8000` sirve para probar la interfaz en el móvil, pero no ofrecerá instalación. Para instalarla desde el teléfono, publica la carpeta en cualquier hosting estático con HTTPS (GitHub Pages, Netlify, Vercel...) o usa un túnel tipo `ngrok http 8000`.

---

## 📲 Cómo Instalar en la Pantalla de Inicio del Móvil

Una vez abierta la URL en tu navegador móvil:

- **En Android (Google Chrome):**
  1. Pulsa el botón de opciones (tres puntos verticales en la esquina superior derecha).
  2. Selecciona **"Añadir a la pantalla de inicio"** o **"Instalar aplicación"**.
  3. La app aparecerá en tu cajón de aplicaciones y pantalla de inicio con su icono y a pantalla completa.

- **En iPhone / iPad (Safari):**
  1. Pulsa el botón **Compartir** (icono cuadrado con una flecha hacia arriba en la barra inferior).
  2. Desplázate y selecciona **"Añadir a la pantalla de inicio"**.
  3. Pulsa en "Añadir". Se abrirá en modo app nativa sin barras de navegación de Safari.
