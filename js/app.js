/**
 * FitTrack - Mobile Gym Routine & Workout Tracker
 * Full client-side application with offline PWA support and Web Audio API
 */

// ============================================================
// CONSTANTS & INITIAL DATA
// ============================================================

const DAYS_OF_WEEK = [
  { id: 1, name: 'Lunes', short: 'LUN' },
  { id: 2, name: 'Martes', short: 'MAR' },
  { id: 3, name: 'Miércoles', short: 'MIÉ' },
  { id: 4, name: 'Jueves', short: 'JUE' },
  { id: 5, name: 'Viernes', short: 'VIE' },
  { id: 6, name: 'Sábado', short: 'SÁB' },
  { id: 7, name: 'Domingo', short: 'DOM' }
];

const TEMPLATES = {
  ppl: [
    {
      dayId: 1, dayName: 'Lunes', isRest: false,
      title: 'Empuje A (Pecho, Hombro, Tríceps)',
      description: 'Enfoque en fuerza e hipertrofia de empuje',
      exercises: [
        { id: 'ex-1', name: 'Press de Banca Plano', muscle: 'Pecho', sets: 4, targetReps: '6-8', targetWeight: 70, restSeconds: 120, notes: 'Pausa de 1s en el pecho' },
        { id: 'ex-2', name: 'Press Inclinado con Mancuernas', muscle: 'Pecho', sets: 3, targetReps: '8-10', targetWeight: 24, restSeconds: 90, notes: 'Banco a 30 grados' },
        { id: 'ex-3', name: 'Fondos en Paralelas / Dips', muscle: 'Pecho', sets: 3, targetReps: '10-12', targetWeight: 0, restSeconds: 90, notes: 'Torso inclinado hacia adelante' },
        { id: 'ex-4', name: 'Elevaciones Laterales', muscle: 'Hombro', sets: 4, targetReps: '12-15', targetWeight: 10, restSeconds: 60, notes: 'Control en la bajada' },
        { id: 'ex-5', name: 'Extensión de Tríceps en Polea', muscle: 'Tríceps', sets: 3, targetReps: '10-12', targetWeight: 25, restSeconds: 60, notes: 'Codos pegados al cuerpo' }
      ]
    },
    {
      dayId: 2, dayName: 'Martes', isRest: false,
      title: 'Tirón A (Espalda y Bíceps)',
      description: 'Foco en densidad y amplitud de espalda',
      exercises: [
        { id: 'ex-6', name: 'Dominadas o Jalón al Pecho', muscle: 'Espalda', sets: 4, targetReps: '8-10', targetWeight: 0, restSeconds: 120, notes: 'Rango de recorrido completo' },
        { id: 'ex-7', name: 'Remo con Barra', muscle: 'Espalda', sets: 4, targetReps: '8-10', targetWeight: 60, restSeconds: 90, notes: 'Espalda recta y codos atrás' },
        { id: 'ex-8', name: 'Remo Gironda (Polea Baja)', muscle: 'Espalda', sets: 3, targetReps: '10-12', targetWeight: 45, restSeconds: 75, notes: 'Apretar escápulas 1s' },
        { id: 'ex-9', name: 'Face Pulls', muscle: 'Hombro', sets: 3, targetReps: '15', targetWeight: 20, restSeconds: 60, notes: 'Salud de hombros y deltoides posterior' },
        { id: 'ex-10', name: 'Curl de Bíceps con Barra Z', muscle: 'Bíceps', sets: 4, targetReps: '10-12', targetWeight: 25, restSeconds: 60, notes: 'Sin balanceo del torso' }
      ]
    },
    {
      dayId: 3, dayName: 'Miércoles', isRest: false,
      title: 'Pierna A (Cuádriceps y Gemelos)',
      description: 'Tren inferior con énfasis en cuádriceps',
      exercises: [
        { id: 'ex-11', name: 'Sentadilla con Barra (Squat)', muscle: 'Pierna', sets: 4, targetReps: '6-8', targetWeight: 80, restSeconds: 150, notes: 'Profundidad paralela o más' },
        { id: 'ex-12', name: 'Prensa Inclinada de Piernas', muscle: 'Pierna', sets: 4, targetReps: '10-12', targetWeight: 140, restSeconds: 90, notes: 'Pies a anchura de hombros' },
        { id: 'ex-13', name: 'Extensión de Cuádriceps', muscle: 'Pierna', sets: 3, targetReps: '12-15', targetWeight: 50, restSeconds: 60, notes: 'Contracción arriba' },
        { id: 'ex-14', name: 'Elevación de Talones (Gemelos)', muscle: 'Pierna', sets: 4, targetReps: '15-20', targetWeight: 60, restSeconds: 60, notes: 'Estiramiento profundo abajo' }
      ]
    },
    {
      dayId: 4, dayName: 'Jueves', isRest: false,
      title: 'Empuje B (Hombro y Pecho Superior)',
      description: 'Énfasis en deltoides y pectoral clavicular',
      exercises: [
        { id: 'ex-15', name: 'Press Militar de Hombro con Barra', muscle: 'Hombro', sets: 4, targetReps: '6-8', targetWeight: 45, restSeconds: 120, notes: 'Core y glúteos activos' },
        { id: 'ex-16', name: 'Press Inclinado con Barra', muscle: 'Pecho', sets: 3, targetReps: '8-10', targetWeight: 60, restSeconds: 90, notes: 'Bajar a la parte alta del pecho' },
        { id: 'ex-17', name: 'Aperturas en Polea (Cruce)', muscle: 'Pecho', sets: 3, targetReps: '12-15', targetWeight: 15, restSeconds: 60, notes: 'Apretar el pecho al centro' },
        { id: 'ex-18', name: 'Press Francés con Barra Z', muscle: 'Tríceps', sets: 3, targetReps: '10-12', targetWeight: 22, restSeconds: 75, notes: 'Codos estables' }
      ]
    },
    {
      dayId: 5, dayName: 'Viernes', isRest: false,
      title: 'Tirón B (Espalda y Bíceps Braquial)',
      description: 'Variación de jalones y brazos',
      exercises: [
        { id: 'ex-19', name: 'Peso Muerto (Deadlift)', muscle: 'Espalda', sets: 3, targetReps: '5', targetWeight: 100, restSeconds: 180, notes: 'Postura perfecta, barra pegada a tibias' },
        { id: 'ex-20', name: 'Remo Unilateral con Mancuerna', muscle: 'Espalda', sets: 3, targetReps: '10', targetWeight: 26, restSeconds: 75, notes: 'Codo pegado a la cadera' },
        { id: 'ex-21', name: 'Pullover en Polea Alta', muscle: 'Espalda', sets: 3, targetReps: '12-15', targetWeight: 25, restSeconds: 60, notes: 'Aislamiento de dorsales' },
        { id: 'ex-22', name: 'Curl Martillo con Mancuernas', muscle: 'Bíceps', sets: 3, targetReps: '10-12', targetWeight: 14, restSeconds: 60, notes: 'Foco en braquiorradial' }
      ]
    },
    {
      dayId: 6, dayName: 'Sábado', isRest: false,
      title: 'Pierna B (Isquios y Glúteos)',
      description: 'Cadena posterior y abdomen',
      exercises: [
        { id: 'ex-23', name: 'Peso Muerto Rumano', muscle: 'Pierna', sets: 4, targetReps: '8-10', targetWeight: 70, restSeconds: 120, notes: 'Flexionar caderas hacia atrás' },
        { id: 'ex-24', name: 'Hip Thrust con Barra', muscle: 'Pierna', sets: 4, targetReps: '10-12', targetWeight: 90, restSeconds: 90, notes: 'Apretar glúteos arriba 1s' },
        { id: 'ex-25', name: 'Curl Femoral Tumbado', muscle: 'Pierna', sets: 3, targetReps: '12', targetWeight: 40, restSeconds: 60, notes: 'Bajada controlada' },
        { id: 'ex-26', name: 'Elevación de Piernas Colgado', muscle: 'Core', sets: 3, targetReps: '12-15', targetWeight: 0, restSeconds: 60, notes: 'Sin balanceo excesivo' }
      ]
    },
    {
      dayId: 7, dayName: 'Domingo', isRest: true,
      title: 'Descanso Total',
      description: 'Día para recargar energías, hidratarse y descansar',
      exercises: []
    }
  ],
  upper_lower: [
    {
      dayId: 1, dayName: 'Lunes', isRest: false,
      title: 'Torso A (Fuerza)',
      description: 'Pecho, espalda y hombro pesado',
      exercises: [
        { id: 'ex-ul-1', name: 'Press de Banca Plano', muscle: 'Pecho', sets: 4, targetReps: '6', targetWeight: 75, restSeconds: 120, notes: '' },
        { id: 'ex-ul-2', name: 'Remo con Barra', muscle: 'Espalda', sets: 4, targetReps: '6-8', targetWeight: 65, restSeconds: 120, notes: '' },
        { id: 'ex-ul-3', name: 'Press Militar con Mancuernas', muscle: 'Hombro', sets: 3, targetReps: '8-10', targetWeight: 20, restSeconds: 90, notes: '' },
        { id: 'ex-ul-4', name: 'Jalón al Pecho', muscle: 'Espalda', sets: 3, targetReps: '8-10', targetWeight: 55, restSeconds: 90, notes: '' },
        { id: 'ex-ul-5', name: 'Superserie Bíceps/Tríceps', muscle: 'Bíceps', sets: 3, targetReps: '12', targetWeight: 16, restSeconds: 60, notes: '' }
      ]
    },
    {
      dayId: 2, dayName: 'Martes', isRest: false,
      title: 'Pierna A (Fuerza)',
      description: 'Sentadillas y cuádriceps',
      exercises: [
        { id: 'ex-ul-6', name: 'Sentadilla con Barra', muscle: 'Pierna', sets: 4, targetReps: '6', targetWeight: 85, restSeconds: 150, notes: '' },
        { id: 'ex-ul-7', name: 'Prensa de Piernas', muscle: 'Pierna', sets: 3, targetReps: '10', targetWeight: 150, restSeconds: 90, notes: '' },
        { id: 'ex-ul-8', name: 'Curl Femoral', muscle: 'Pierna', sets: 3, targetReps: '10-12', targetWeight: 45, restSeconds: 75, notes: '' },
        { id: 'ex-ul-9', name: 'Gemelos de Pie', muscle: 'Pierna', sets: 4, targetReps: '15', targetWeight: 65, restSeconds: 60, notes: '' }
      ]
    },
    {
      dayId: 3, dayName: 'Miércoles', isRest: true,
      title: 'Descanso Activo',
      description: 'Paseo suave o estiramientos ligeros',
      exercises: []
    },
    {
      dayId: 4, dayName: 'Jueves', isRest: false,
      title: 'Torso B (Hipertrofia)',
      description: 'Volumen y congestión de tren superior',
      exercises: [
        { id: 'ex-ul-10', name: 'Press Inclinado Mancuernas', muscle: 'Pecho', sets: 4, targetReps: '10-12', targetWeight: 22, restSeconds: 90, notes: '' },
        { id: 'ex-ul-11', name: 'Dominadas Asistidas o Neutras', muscle: 'Espalda', sets: 4, targetReps: '10', targetWeight: 0, restSeconds: 90, notes: '' },
        { id: 'ex-ul-12', name: 'Elevaciones Laterales', muscle: 'Hombro', sets: 4, targetReps: '15', targetWeight: 10, restSeconds: 60, notes: '' },
        { id: 'ex-ul-13', name: 'Cruces en Polea', muscle: 'Pecho', sets: 3, targetReps: '12-15', targetWeight: 12, restSeconds: 60, notes: '' }
      ]
    },
    {
      dayId: 5, dayName: 'Viernes', isRest: false,
      title: 'Pierna B (Cadena Posterior)',
      description: 'Peso muerto rumano y glúteos',
      exercises: [
        { id: 'ex-ul-14', name: 'Peso Muerto Rumano', muscle: 'Pierna', sets: 4, targetReps: '8-10', targetWeight: 75, restSeconds: 120, notes: '' },
        { id: 'ex-ul-15', name: 'Zancadas con Mancuernas', muscle: 'Pierna', sets: 3, targetReps: '10 por pierna', targetWeight: 16, restSeconds: 90, notes: '' },
        { id: 'ex-ul-16', name: 'Extensión de Cuádriceps', muscle: 'Pierna', sets: 3, targetReps: '15', targetWeight: 50, restSeconds: 60, notes: '' },
        { id: 'ex-ul-17', name: 'Abdominales en Polea (Crunch)', muscle: 'Core', sets: 3, targetReps: '15', targetWeight: 35, restSeconds: 60, notes: '' }
      ]
    },
    {
      dayId: 6, dayName: 'Sábado', isRest: true,
      title: 'Descanso de Fin de Semana',
      description: 'Recuperación',
      exercises: []
    },
    {
      dayId: 7, dayName: 'Domingo', isRest: true,
      title: 'Descanso de Fin de Semana',
      description: 'Recuperación',
      exercises: []
    }
  ],
  full_body: [
    {
      dayId: 1, dayName: 'Lunes', isRest: false,
      title: 'Full Body A',
      description: 'Sentadilla, Press Plano y Remo',
      exercises: [
        { id: 'ex-fb-1', name: 'Sentadilla con Barra', muscle: 'Pierna', sets: 3, targetReps: '8', targetWeight: 75, restSeconds: 120, notes: '' },
        { id: 'ex-fb-2', name: 'Press de Banca Plano', muscle: 'Pecho', sets: 3, targetReps: '8', targetWeight: 65, restSeconds: 120, notes: '' },
        { id: 'ex-fb-3', name: 'Remo con Barra', muscle: 'Espalda', sets: 3, targetReps: '8', targetWeight: 60, restSeconds: 90, notes: '' },
        { id: 'ex-fb-4', name: 'Elevaciones Laterales', muscle: 'Hombro', sets: 3, targetReps: '12', targetWeight: 10, restSeconds: 60, notes: '' },
        { id: 'ex-fb-5', name: 'Plancha Abdominal', muscle: 'Core', sets: 3, targetReps: '45s', targetWeight: 0, restSeconds: 60, notes: '' }
      ]
    },
    {
      dayId: 2, dayName: 'Martes', isRest: true,
      title: 'Día de Recuperación',
      description: 'Descanso',
      exercises: []
    },
    {
      dayId: 3, dayName: 'Miércoles', isRest: false,
      title: 'Full Body B',
      description: 'Peso Muerto, Press Militar y Dominadas',
      exercises: [
        { id: 'ex-fb-6', name: 'Peso Muerto Convencional', muscle: 'Espalda', sets: 3, targetReps: '6', targetWeight: 90, restSeconds: 150, notes: '' },
        { id: 'ex-fb-7', name: 'Press Militar de Hombro', muscle: 'Hombro', sets: 3, targetReps: '8', targetWeight: 40, restSeconds: 120, notes: '' },
        { id: 'ex-fb-8', name: 'Dominadas / Jalón al Pecho', muscle: 'Espalda', sets: 3, targetReps: '8-10', targetWeight: 0, restSeconds: 90, notes: '' },
        { id: 'ex-fb-9', name: 'Prensa de Piernas', muscle: 'Pierna', sets: 3, targetReps: '10-12', targetWeight: 130, restSeconds: 90, notes: '' }
      ]
    },
    {
      dayId: 4, dayName: 'Jueves', isRest: true,
      title: 'Día de Recuperación',
      description: 'Descanso',
      exercises: []
    },
    {
      dayId: 5, dayName: 'Viernes', isRest: false,
      title: 'Full Body C',
      description: 'Zancadas, Press Inclinado y Brazos',
      exercises: [
        { id: 'ex-fb-10', name: 'Zancadas o Sentadilla Búlgara', muscle: 'Pierna', sets: 3, targetReps: '10', targetWeight: 16, restSeconds: 90, notes: '' },
        { id: 'ex-fb-11', name: 'Press Inclinado con Mancuernas', muscle: 'Pecho', sets: 3, targetReps: '10', targetWeight: 22, restSeconds: 90, notes: '' },
        { id: 'ex-fb-12', name: 'Remo Unilateral con Mancuerna', muscle: 'Espalda', sets: 3, targetReps: '10', targetWeight: 24, restSeconds: 75, notes: '' },
        { id: 'ex-fb-13', name: 'Curl de Bíceps', muscle: 'Bíceps', sets: 3, targetReps: '12', targetWeight: 12, restSeconds: 60, notes: '' },
        { id: 'ex-fb-14', name: 'Extensiones de Tríceps', muscle: 'Tríceps', sets: 3, targetReps: '12', targetWeight: 20, restSeconds: 60, notes: '' }
      ]
    },
    {
      dayId: 6, dayName: 'Sábado', isRest: true,
      title: 'Descanso Fin de Semana',
      description: 'Descanso',
      exercises: []
    },
    {
      dayId: 7, dayName: 'Domingo', isRest: true,
      title: 'Descanso Fin de Semana',
      description: 'Descanso',
      exercises: []
    }
  ]
};

// ============================================================
// STATE CONTROLLER
// ============================================================

class AppState {
  constructor() {
    this.selectedDayId = this.getTodayDayId();
    this.routine = this.loadRoutine();
    this.history = this.loadHistory();
    this.activeSession = this.loadActiveSession();
    this.settings = this.loadSettings();

    // Runtime timers
    this.sessionTimerInterval = null;
    this.restTimerInterval = null;
    this.restTimerActive = false;
    this.restEndsAt = 0;
    this.restPausedRemainingMs = 0;
    this.isRestPaused = false;
  }

  getTodayDayId() {
    const jsDay = new Date().getDay(); // 0 is Sunday, 1 is Monday...
    return jsDay === 0 ? 7 : jsDay;
  }

  loadRoutine() {
    const saved = localStorage.getItem('fittrack_routine');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error reading saved routine', e);
      }
    }
    // Default initial routine: PPL
    return JSON.parse(JSON.stringify(TEMPLATES.ppl));
  }

  persist(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.error('No se pudo guardar en el almacenamiento local', e);
      showToast('⚠️ No se pudo guardar (modo privado o almacenamiento lleno)');
    }
  }

  saveRoutine() {
    this.persist('fittrack_routine', JSON.stringify(this.routine));
  }

  loadHistory() {
    const saved = localStorage.getItem('fittrack_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error reading history', e);
      }
    }
    return [];
  }

  saveHistory() {
    this.persist('fittrack_history', JSON.stringify(this.history));
  }

  loadActiveSession() {
    const saved = localStorage.getItem('fittrack_active_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error reading active session', e);
      }
    }
    return null;
  }

  saveActiveSession() {
    if (this.activeSession) {
      this.persist('fittrack_active_session', JSON.stringify(this.activeSession));
    } else {
      try {
        localStorage.removeItem('fittrack_active_session');
      } catch (e) {}
    }
  }

  loadSettings() {
    const saved = localStorage.getItem('fittrack_settings');
    if (saved) {
      try {
        return Object.assign({ sound: true, vibrate: true, defaultRest: 90 }, JSON.parse(saved));
      } catch (e) {
        console.error('Error reading settings', e);
      }
    }
    return {
      sound: true,
      vibrate: true,
      defaultRest: 90
    };
  }

  saveSettings() {
    this.persist('fittrack_settings', JSON.stringify(this.settings));
  }
}

const state = new AppState();

// ============================================================
// AUDIO SYNTHESIZER (WEB AUDIO API - 100% OFFLINE)
// ============================================================

class SoundManager {
  constructor() {
    this.audioCtx = null;
  }

  initContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playTone(freq, type, duration, delay = 0) {
    if (!state.settings.sound) return;
    try {
      this.initContext();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      const startTime = this.audioCtx.currentTime + delay;
      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch (e) {
      console.warn('Audio playback not allowed yet', e);
    }
  }

  playCheckTone() {
    this.playTone(587.33, 'sine', 0.15); // D5
  }

  playRestCompleteTone() {
    this.playTone(523.25, 'sine', 0.15, 0.0);  // C5
    this.playTone(659.25, 'sine', 0.15, 0.15); // E5
    this.playTone(783.99, 'sine', 0.35, 0.30); // G5
  }

  vibrate(pattern = [100]) {
    if (!state.settings.vibrate) return;
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {}
    }
  }
}

const soundManager = new SoundManager();

// ============================================================
// DOM ELEMENTS REFERENCE
// ============================================================

const DOM = {
  // Navigation
  navItems: document.querySelectorAll('.nav-item'),
  tabPanes: document.querySelectorAll('.tab-pane'),
  navWorkoutPulse: document.getElementById('nav-workout-pulse'),

  // Routine tab
  weekStrip: document.getElementById('week-strip'),
  selectedDayBadge: document.getElementById('selected-day-badge'),
  selectedDayTag: document.getElementById('selected-day-tag'),
  selectedDayTitle: document.getElementById('selected-day-title'),
  selectedDayDesc: document.getElementById('selected-day-desc'),
  dayDetailCard: document.getElementById('day-detail-card'),
  restDayView: document.getElementById('rest-day-view'),
  btnConvertToTraining: document.getElementById('btn-convert-to-training'),
  btnStartFromRoutine: document.getElementById('btn-start-from-routine'),
  btnStartText: document.getElementById('btn-start-text'),
  btnEditDay: document.getElementById('btn-edit-day'),
  btnAddExercise: document.getElementById('btn-add-exercise'),
  exercisesCount: document.getElementById('exercise-count'),
  exercisesList: document.getElementById('exercises-list'),
  btnHeaderAction: document.getElementById('btn-header-action'),

  // Workout tab
  noWorkoutState: document.getElementById('no-workout-state'),
  activeWorkoutState: document.getElementById('active-workout-state'),
  todayRoutineName: document.getElementById('today-routine-name'),
  btnLaunchToday: document.getElementById('btn-launch-today'),
  btnSelectDayWorkout: document.getElementById('btn-select-day-workout'),
  btnStartEmptyWorkout: document.getElementById('btn-start-empty-workout'),
  sessionTitle: document.getElementById('session-title'),
  sessionLiveClock: document.getElementById('session-live-clock'),
  sessionProgressFill: document.getElementById('session-progress-fill'),
  activeExercisesList: document.getElementById('active-exercises-list'),
  btnFinishWorkout: document.getElementById('btn-finish-workout'),
  btnCancelWorkout: document.getElementById('btn-cancel-workout'),
  btnAddExerciseToSession: document.getElementById('btn-add-exercise-to-session'),

  // Floating Rest Timer
  floatingRestTimer: document.getElementById('floating-rest-timer'),
  restClockDisplay: document.getElementById('rest-clock-display'),
  btnTimerAdd30: document.getElementById('btn-timer-add30'),
  btnTimerPause: document.getElementById('btn-timer-pause'),
  btnTimerSkip: document.getElementById('btn-timer-skip'),

  // History tab
  statTotalWorkouts: document.getElementById('stat-total-workouts'),
  statTotalVolume: document.getElementById('stat-total-volume'),
  statTotalSets: document.getElementById('stat-total-sets'),
  statTotalTime: document.getElementById('stat-total-time'),
  historyTotalCount: document.getElementById('history-total-count'),
  historyList: document.getElementById('history-list'),

  // Settings tab
  settingSound: document.getElementById('setting-sound'),
  settingVibrate: document.getElementById('setting-vibrate'),
  settingDefaultRest: document.getElementById('setting-default-rest'),
  btnExportData: document.getElementById('btn-export-data'),
  btnImportTrigger: document.getElementById('btn-import-trigger'),
  fileImportInput: document.getElementById('file-import-input'),
  btnResetDemo: document.getElementById('btn-reset-demo'),

  // Modals
  modalExercise: document.getElementById('modal-exercise'),
  modalExerciseTitle: document.getElementById('modal-exercise-title'),
  formExercise: document.getElementById('form-exercise'),
  exEditId: document.getElementById('ex-edit-id'),
  exName: document.getElementById('ex-name'),
  exMuscle: document.getElementById('ex-muscle'),
  muscleChipGroup: document.getElementById('muscle-chip-group'),
  exSets: document.getElementById('ex-sets'),
  exReps: document.getElementById('ex-reps'),
  exWeight: document.getElementById('ex-weight'),
  exRest: document.getElementById('ex-rest'),
  exNotes: document.getElementById('ex-notes'),
  btnSaveExercise: document.getElementById('btn-save-exercise'),

  modalDay: document.getElementById('modal-day'),
  modalDayTitle: document.getElementById('modal-day-title'),
  dayTitleInput: document.getElementById('day-title-input'),
  dayDescInput: document.getElementById('day-desc-input'),
  dayIsRestCheck: document.getElementById('day-is-rest-check'),
  btnSaveDay: document.getElementById('btn-save-day'),

  modalTemplates: document.getElementById('modal-templates'),
  modalSelectDay: document.getElementById('modal-select-day'),
  selectDayList: document.getElementById('select-day-list'),

  modalWorkoutSummary: document.getElementById('modal-workout-summary'),
  summaryWorkoutName: document.getElementById('summary-workout-name'),
  summaryDuration: document.getElementById('summary-duration'),
  summaryVolume: document.getElementById('summary-volume'),
  summarySets: document.getElementById('summary-sets'),
  summaryNotes: document.getElementById('summary-notes'),
  btnSaveSummary: document.getElementById('btn-save-summary'),

  modalHistoryDetail: document.getElementById('modal-history-detail'),
  historyDetailTitle: document.getElementById('history-detail-title'),
  historyDetailDate: document.getElementById('history-detail-date'),
  historyDetailContent: document.getElementById('history-detail-content'),
  btnDeleteHistoryItem: document.getElementById('btn-delete-history-item'),

  toast: document.getElementById('toast'),
  toastMessage: document.getElementById('toast-message')
};

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

function showToast(msg, duration = 2500) {
  DOM.toastMessage.textContent = msg;
  DOM.toast.classList.add('show');
  setTimeout(() => {
    DOM.toast.classList.remove('show');
  }, duration);
}

function openModal(modalEl) {
  modalEl.classList.add('open');
}

function closeModal(modalEl) {
  modalEl.classList.remove('open');
}

function formatDuration(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function formatDurationHours(seconds) {
  const hours = (seconds / 3600).toFixed(1);
  return hours;
}

function formatDateSpanish(dateStr) {
  const date = new Date(dateStr);
  const options = { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' };
  return date.toLocaleDateString('es-ES', options);
}

// Escape user-provided text before inserting it into innerHTML templates
function escapeHtml(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '\u0026amp;')
    .replace(/</g, '\u0026lt;')
    .replace(/>/g, '\u0026gt;')
    .replace(/"/g, '\u0026quot;')
    .replace(/'/g, '\u0026#39;');
}

// Update the "today's routine" label shown in the pre-workout screen
function updateTodayRoutineName() {
  const todayId = state.getTodayDayId();
  const todayRoutine = state.routine.find(d => d.dayId === todayId);
  if (todayRoutine) {
    DOM.todayRoutineName.textContent = todayRoutine.isRest ? 'Día de Descanso' : (todayRoutine.title || 'Entrenamiento');
  }
}

// Find the best recorded performance (heaviest set) for an exercise from history
function getLastExercisePerformance(exerciseName) {
  for (const session of state.history) {
    if (!session.exercises) continue;
    const found = session.exercises.find(e => e.name && e.name.trim().toLowerCase() === exerciseName.trim().toLowerCase());
    if (found && found.sets && found.sets.length > 0) {
      const completedSets = found.sets.filter(s => s.completed);
      if (completedSets.length === 0) continue;

      const best = completedSets.reduce((a, b) => {
        const aw = parseFloat(a.weight) || 0;
        const bw = parseFloat(b.weight) || 0;
        const ar = parseInt(a.reps) || 0;
        const br = parseInt(b.reps) || 0;
        return (bw > aw || (bw === aw && br > ar)) ? b : a;
      });

      const w = parseFloat(best.weight) || 0;
      const r = parseInt(best.reps) || 0;
      if (w > 0) return `${w}kg × ${r}`;
      if (r > 0) return `${r} reps`;
      return null;
    }
  }
  return null;
}

// ============================================================
// NAVIGATION & TABS
// ============================================================

function switchTab(tabId) {
  DOM.navItems.forEach(item => {
    if (item.dataset.tab === tabId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  DOM.tabPanes.forEach(pane => {
    if (pane.id === tabId) {
      pane.classList.add('active');
    } else {
      pane.classList.remove('active');
    }
  });

  // Re-render specific tabs when opened
  if (tabId === 'tab-routine') {
    renderRoutineTab();
  } else if (tabId === 'tab-workout') {
    renderWorkoutTab();
  } else if (tabId === 'tab-history') {
    renderHistoryTab();
  } else if (tabId === 'tab-settings') {
    renderSettingsTab();
  }
}

// Attach nav clicks
DOM.navItems.forEach(item => {
  item.addEventListener('click', () => {
    soundManager.initContext();
    switchTab(item.dataset.tab);
  });
});

// Modal close button listeners
document.querySelectorAll('.btn-close-modal').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetModalId = btn.getAttribute('data-close');
    if (targetModalId) {
      closeModal(document.getElementById(targetModalId));
    }
  });
});

// Backdrop click closes modal
document.querySelectorAll('.modal-backdrop').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
});

// Escape key closes any open modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-backdrop.open').forEach(modal => closeModal(modal));
  }
});

// ============================================================
// TAB 1: WEEKLY ROUTINE LOGIC & RENDERING
// ============================================================

function renderRoutineTab() {
  const todayId = state.getTodayDayId();
  updateTodayRoutineName();

  // Render Day Selector Strip
  DOM.weekStrip.innerHTML = '';
  DAYS_OF_WEEK.forEach(day => {
    const routineDay = state.routine.find(d => d.dayId === day.id) || {
      dayId: day.id, dayName: day.name, isRest: true, title: 'Descanso', exercises: []
    };

    const chip = document.createElement('div');
    chip.className = 'day-chip';
    if (day.id === state.selectedDayId) chip.classList.add('selected');
    if (day.id === todayId) chip.classList.add('is-today');
    if (routineDay.isRest) {
      chip.classList.add('is-rest');
    } else {
      chip.classList.add('has-workout');
    }

    chip.innerHTML = `
      <span class="chip-name">${day.short}</span>
      <div class="chip-dot"></div>
    `;

    chip.addEventListener('click', () => {
      state.selectedDayId = day.id;
      renderRoutineTab();
    });

    DOM.weekStrip.appendChild(chip);
  });

  // Get current selected day data
  const currentDay = state.routine.find(d => d.dayId === state.selectedDayId) || {
    dayId: state.selectedDayId,
    dayName: DAYS_OF_WEEK.find(d => d.id === state.selectedDayId).name,
    isRest: true,
    title: 'Descanso',
    description: '',
    exercises: []
  };

  DOM.selectedDayBadge.textContent = currentDay.dayName.toUpperCase();
  if (state.selectedDayId === todayId) {
    DOM.selectedDayBadge.textContent = `${currentDay.dayName.toUpperCase()} (HOY)`;
  }

  if (currentDay.isRest) {
    DOM.selectedDayTag.className = 'badge badge-rest';
    DOM.selectedDayTag.textContent = 'DESCANSO';
    DOM.selectedDayTitle.textContent = currentDay.title || 'Día de Descanso';
    DOM.selectedDayDesc.textContent = currentDay.description || 'Recuperación muscular y descanso';
    DOM.btnStartFromRoutine.style.display = 'none';
    DOM.restDayView.style.display = 'flex';
    document.getElementById('exercises-container').style.display = 'none';
  } else {
    DOM.selectedDayTag.className = 'badge badge-muscle';
    DOM.selectedDayTag.textContent = 'ENTRENAMIENTO';
    DOM.selectedDayTitle.textContent = currentDay.title || 'Sesión de Entrenamiento';
    DOM.selectedDayDesc.textContent = currentDay.description || 'Rutina programada para este día';
    DOM.btnStartFromRoutine.style.display = 'flex';
    DOM.restDayView.style.display = 'none';
    document.getElementById('exercises-container').style.display = 'block';

    if (state.selectedDayId === todayId) {
      DOM.btnStartText.textContent = 'Iniciar Entrenamiento de Hoy';
    } else {
      DOM.btnStartText.textContent = `Iniciar Entrenamiento (${currentDay.dayName})`;
    }
  }

  // Render Exercises List
  const exercises = currentDay.exercises || [];
  DOM.exercisesCount.textContent = exercises.length;
  DOM.exercisesList.innerHTML = '';

  if (exercises.length === 0 && !currentDay.isRest) {
    DOM.exercisesList.innerHTML = `
      <div class="empty-state">
        <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <h3>No hay ejercicios programados</h3>
        <p>Añade los ejercicios que quieras realizar este día con sus series, repeticiones y descanso.</p>
        <button class="btn btn-secondary" id="btn-empty-add-exercise">+ Añadir primer ejercicio</button>
      </div>
    `;
    document.getElementById('btn-empty-add-exercise').addEventListener('click', () => openAddExerciseModal('routine'));
    return;
  }

  exercises.forEach((ex, index) => {
    const card = document.createElement('div');
    card.className = 'exercise-card';
    card.innerHTML = `
      <div class="exercise-card-top">
        <div class="exercise-title-area">
          <span class="exercise-order-badge">${index + 1}</span>
          <div>
            <div class="exercise-name">${escapeHtml(ex.name)}</div>
            <span class="badge badge-muscle" style="font-size: 0.65rem; margin-top: 2px;">${escapeHtml(ex.muscle || 'General')}</span>
          </div>
        </div>
        <div style="display: flex; gap: 4px;">
          ${index > 0 ? `<button class="btn-icon btn-move-up" data-index="${index}" style="width: 32px; height: 32px; font-size: 0.8rem;" title="Mover arriba" aria-label="Mover arriba">↑</button>` : ''}
          ${index < exercises.length - 1 ? `<button class="btn-icon btn-move-down" data-index="${index}" style="width: 32px; height: 32px; font-size: 0.8rem;" title="Mover abajo" aria-label="Mover abajo">↓</button>` : ''}
          <button class="btn-icon btn-duplicate-ex" data-index="${index}" style="width: 32px; height: 32px; color: var(--text-muted);" title="Duplicar" aria-label="Duplicar ejercicio">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
          <button class="btn-icon btn-edit-ex" data-index="${index}" style="width: 32px; height: 32px;" title="Editar" aria-label="Editar ejercicio">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
          </button>
          <button class="btn-icon btn-delete-ex" data-index="${index}" style="width: 32px; height: 32px; color: var(--danger);" title="Eliminar" aria-label="Eliminar ejercicio">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="exercise-details-row">
        <span class="exercise-stat-pill"><strong>${escapeHtml(ex.sets)}</strong> series</span>
        <span>•</span>
        <span class="exercise-stat-pill"><strong>${escapeHtml(ex.targetReps)}</strong> reps</span>
        <span>•</span>
        <span class="exercise-stat-pill"><strong>${escapeHtml(ex.targetWeight || 0)}</strong> kg</span>
        <span>•</span>
        <span class="exercise-stat-pill">⏱ <strong>${escapeHtml(ex.restSeconds || 90)}</strong>s</span>
      </div>
      ${ex.notes ? `<div class="exercise-notes">${escapeHtml(ex.notes)}</div>` : ''}
    `;

    // Action listeners
    card.querySelector('.btn-edit-ex')?.addEventListener('click', () => openEditExerciseModal(index));
    card.querySelector('.btn-delete-ex')?.addEventListener('click', () => deleteExercise(index));
    card.querySelector('.btn-duplicate-ex')?.addEventListener('click', () => duplicateExercise(index));
    card.querySelector('.btn-move-up')?.addEventListener('click', () => moveExercise(index, -1));
    card.querySelector('.btn-move-down')?.addEventListener('click', () => moveExercise(index, 1));

    DOM.exercisesList.appendChild(card);
  });
}

// Convert rest day to training day
DOM.btnConvertToTraining.addEventListener('click', () => {
  const currentDay = state.routine.find(d => d.dayId === state.selectedDayId);
  if (currentDay) {
    currentDay.isRest = false;
    currentDay.title = 'Entrenamiento de ' + currentDay.dayName;
    currentDay.description = 'Añade ejercicios para este día';
    state.saveRoutine();
    renderRoutineTab();
    showToast('Día cambiado a entrenamiento');
  }
});

// Move exercise up or down
function moveExercise(index, direction) {
  const currentDay = state.routine.find(d => d.dayId === state.selectedDayId);
  if (!currentDay || !currentDay.exercises) return;
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= currentDay.exercises.length) return;

  const temp = currentDay.exercises[index];
  currentDay.exercises[index] = currentDay.exercises[targetIndex];
  currentDay.exercises[targetIndex] = temp;

  state.saveRoutine();
  renderRoutineTab();
}

// Delete exercise
function deleteExercise(index) {
  const currentDay = state.routine.find(d => d.dayId === state.selectedDayId);
  if (!currentDay || !currentDay.exercises) return;

  const exercise = currentDay.exercises[index];
  if (!exercise) return;
  const exName = exercise.name;
  if (confirm(`¿Eliminar "${exName}" de la rutina del ${currentDay.dayName}?`)) {
    currentDay.exercises.splice(index, 1);
    state.saveRoutine();
    renderRoutineTab();
    showToast('Ejercicio eliminado');
  }
}

// Duplicate exercise (inserts a copy right below the original)
function duplicateExercise(index) {
  const currentDay = state.routine.find(d => d.dayId === state.selectedDayId);
  if (!currentDay || !currentDay.exercises || !currentDay.exercises[index]) return;

  const copy = JSON.parse(JSON.stringify(currentDay.exercises[index]));
  copy.id = 'ex-' + Date.now();
  if (copy.name) copy.name = copy.name + ' (copia)';
  currentDay.exercises.splice(index + 1, 0, copy);

  state.saveRoutine();
  renderRoutineTab();
  showToast('Ejercicio duplicado');
}

// Modal Day Edit
DOM.btnEditDay.addEventListener('click', () => {
  const currentDay = state.routine.find(d => d.dayId === state.selectedDayId);
  if (!currentDay) return;

  DOM.modalDayTitle.textContent = `Configurar ${currentDay.dayName}`;
  DOM.dayTitleInput.value = currentDay.title || '';
  DOM.dayDescInput.value = currentDay.description || '';
  DOM.dayIsRestCheck.checked = !!currentDay.isRest;
  openModal(DOM.modalDay);
});

DOM.btnSaveDay.addEventListener('click', (e) => {
  e.preventDefault();
  const currentDay = state.routine.find(d => d.dayId === state.selectedDayId);
  if (!currentDay) return;

  const title = DOM.dayTitleInput.value.trim();
  if (!title) {
    alert('Introduce un nombre para la rutina');
    return;
  }

  currentDay.title = title;
  currentDay.description = DOM.dayDescInput.value.trim();
  currentDay.isRest = DOM.dayIsRestCheck.checked;

  state.saveRoutine();
  closeModal(DOM.modalDay);
  renderRoutineTab();
  showToast('Día actualizado');
});

// Modal Exercise Add/Edit
// mode: 'routine' -> edits the weekly routine | 'session' -> adds to the live workout
const exerciseModalMode = { current: 'routine' };

function openAddExerciseModal(mode = 'routine') {
  exerciseModalMode.current = mode;
  DOM.modalExerciseTitle.textContent = mode === 'session' ? 'Añadir a la Sesión' : 'Añadir Ejercicio';
  DOM.exEditId.value = '';
  DOM.exName.value = '';
  DOM.exMuscle.value = 'Pecho';
  selectMuscleChip('Pecho');
  DOM.exSets.value = '4';
  DOM.exReps.value = '8-10';
  DOM.exWeight.value = '0';
  DOM.exRest.value = state.settings.defaultRest || '90';
  DOM.exNotes.value = '';
  openModal(DOM.modalExercise);
  DOM.exName.focus();
}

function openEditExerciseModal(index) {
  const currentDay = state.routine.find(d => d.dayId === state.selectedDayId);
  if (!currentDay || !currentDay.exercises[index]) return;

  const ex = currentDay.exercises[index];
  DOM.modalExerciseTitle.textContent = 'Editar Ejercicio';
  DOM.exEditId.value = index.toString();
  DOM.exName.value = ex.name || '';
  DOM.exMuscle.value = ex.muscle || 'Pecho';
  selectMuscleChip(ex.muscle || 'Pecho');
  DOM.exSets.value = ex.sets || '4';
  DOM.exReps.value = ex.targetReps || '8-10';
  DOM.exWeight.value = ex.targetWeight || '0';
  DOM.exRest.value = ex.restSeconds || '90';
  DOM.exNotes.value = ex.notes || '';
  openModal(DOM.modalExercise);
}

DOM.btnAddExercise.addEventListener('click', () => openAddExerciseModal('routine'));

// Muscle chip selectors
function selectMuscleChip(val) {
  document.querySelectorAll('#muscle-chip-group .chip-option').forEach(c => {
    if (c.dataset.val.toLowerCase() === val.toLowerCase()) {
      c.classList.add('selected');
    } else {
      c.classList.remove('selected');
    }
  });
}

document.querySelectorAll('#muscle-chip-group .chip-option').forEach(chip => {
  chip.addEventListener('click', () => {
    selectMuscleChip(chip.dataset.val);
    DOM.exMuscle.value = chip.dataset.val;
  });
});

DOM.btnSaveExercise.addEventListener('click', (e) => {
  e.preventDefault();
  const name = DOM.exName.value.trim();
  if (!name) {
    alert('Introduce el nombre del ejercicio');
    DOM.exName.focus();
    return;
  }

  const exerciseData = {
    id: 'ex-' + Date.now(),
    name: name,
    muscle: DOM.exMuscle.value || 'General',
    sets: parseInt(DOM.exSets.value) || 4,
    targetReps: DOM.exReps.value.trim() || '10',
    targetWeight: parseFloat(DOM.exWeight.value) || 0,
    restSeconds: parseInt(DOM.exRest.value) || 90,
    notes: DOM.exNotes.value.trim()
  };

  // Adding to the live workout session
  if (exerciseModalMode.current === 'session') {
    if (!state.activeSession) return;
    state.activeSession.exercises.push(buildSessionExercise(exerciseData));
    state.saveActiveSession();
    closeModal(DOM.modalExercise);
    renderActiveWorkoutSession();
    showToast(`"${name}" añadido a la sesión`);
    return;
  }

  const currentDay = state.routine.find(d => d.dayId === state.selectedDayId);
  if (!currentDay) return;
  if (!currentDay.exercises) currentDay.exercises = [];

  const editIndex = DOM.exEditId.value;
  if (editIndex !== '') {
    // Editing existing
    const idx = parseInt(editIndex);
    if (!currentDay.exercises[idx]) return;
    exerciseData.id = currentDay.exercises[idx].id || exerciseData.id;
    currentDay.exercises[idx] = exerciseData;
    showToast('Ejercicio actualizado');
  } else {
    // Adding new
    currentDay.exercises.push(exerciseData);
    showToast('Ejercicio añadido');
  }

  state.saveRoutine();
  closeModal(DOM.modalExercise);
  renderRoutineTab();
});

// Templates modal
DOM.btnHeaderAction.addEventListener('click', () => {
  openModal(DOM.modalTemplates);
});

document.querySelectorAll('.template-item').forEach(item => {
  item.addEventListener('click', () => {
    const templateKey = item.dataset.template;
    if (TEMPLATES[templateKey]) {
      if (confirm(`¿Cargar la plantilla "${item.querySelector('strong').textContent}"? Se actualizará tu rutina semanal.`)) {
        state.routine = JSON.parse(JSON.stringify(TEMPLATES[templateKey]));
        state.saveRoutine();
        closeModal(DOM.modalTemplates);
        renderRoutineTab();
        showToast('Plantilla cargada correctamente');
      }
    }
  });
});

// ============================================================
// TAB 2: WORKOUT TRACKER (LIVE TRAINING SESSION)
// ============================================================

function renderWorkoutTab() {
  updateTodayRoutineName();

  // Check if session is active
  if (state.activeSession) {
    DOM.noWorkoutState.style.display = 'none';
    DOM.activeWorkoutState.style.display = 'block';
    DOM.navWorkoutPulse.style.display = 'block';

    renderActiveWorkoutSession();
    startSessionTimerClock();
    acquireWakeLock();
  } else {
    DOM.noWorkoutState.style.display = 'block';
    DOM.activeWorkoutState.style.display = 'none';
    DOM.navWorkoutPulse.style.display = 'none';
    hideRestTimer();
    stopSessionTimerClock();
    releaseWakeLock();
  }
}

// Start Workout from Routine Tab button
DOM.btnStartFromRoutine.addEventListener('click', () => {
  const currentDay = state.routine.find(d => d.dayId === state.selectedDayId);
  if (!currentDay) return;
  startNewWorkoutSession(currentDay);
});

// Launch today's workout
DOM.btnLaunchToday.addEventListener('click', () => {
  const todayId = state.getTodayDayId();
  const todayDay = state.routine.find(d => d.dayId === todayId);
  if (!todayDay) return;
  startNewWorkoutSession(todayDay);
});

// Start empty / free workout
DOM.btnStartEmptyWorkout.addEventListener('click', () => {
  startNewWorkoutSession({
    title: 'Entrenamiento Libre',
    dayId: 0,
    exercises: []
  });
});

// Select another day
DOM.btnSelectDayWorkout.addEventListener('click', () => {
  DOM.selectDayList.innerHTML = '';
  state.routine.forEach(day => {
    const btn = document.createElement('div');
    btn.className = 'card';
    btn.style.cursor = 'pointer';
    btn.style.marginBottom = '10px';
    btn.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong style="color: var(--primary);">${escapeHtml(day.dayName)}</strong>: ${escapeHtml(day.title || '')}
          <div style="font-size: 0.8rem; color: var(--text-muted);">${day.isRest ? 'Descanso' : (day.exercises?.length || 0) + ' ejercicios'}</div>
        </div>
        <span class="badge ${day.isRest ? 'badge-rest' : 'badge-muscle'}">${day.isRest ? 'Descanso' : 'Iniciar'}</span>
      </div>
    `;
    btn.addEventListener('click', () => {
      closeModal(DOM.modalSelectDay);
      startNewWorkoutSession(day);
    });
    DOM.selectDayList.appendChild(btn);
  });
  openModal(DOM.modalSelectDay);
});

// Convert a planned routine exercise into a live session exercise (with empty sets)
function buildSessionExercise(ex, index) {
  const setsCount = parseInt(ex.sets) || 3;
  const defaultWeight = parseFloat(ex.targetWeight) || 0;
  const defaultReps = parseInt(ex.targetReps) || 10;

  const sets = [];
  for (let i = 1; i <= setsCount; i++) {
    sets.push({
      setNumber: i,
      weight: defaultWeight,
      reps: defaultReps,
      completed: false
    });
  }

  return {
    id: ex.id || ('session-ex-' + (index !== undefined ? index + '-' : '') + Date.now()),
    name: ex.name,
    muscle: ex.muscle || 'General',
    restSeconds: parseInt(ex.restSeconds) || 90,
    notes: ex.notes || '',
    sets: sets
  };
}

// Initialize and start workout session
function startNewWorkoutSession(routineSource) {
  // Guard: never silently discard an in-progress session
  if (state.activeSession) {
    const discard = confirm('Ya tienes un entrenamiento en curso ("' + state.activeSession.title + '").\n\nSi inicias uno nuevo, la sesión actual se DESCARTARÁ y no se guardará en el historial.\n\n¿Continuar?');
    if (!discard) return;
    hideRestTimer();
  }

  soundManager.initContext();

  const exercises = (routineSource.exercises || []).map((ex, exIndex) => buildSessionExercise(ex, exIndex));

  state.activeSession = {
    id: 'workout-' + Date.now(),
    title: routineSource.title || 'Entrenamiento',
    dayId: routineSource.dayId || 0,
    startTime: Date.now(),
    exercises: exercises
  };

  state.saveActiveSession();
  acquireWakeLock();
  switchTab('tab-workout');
  showToast('¡Entrenamiento iniciado! Dale con todo 🔥');
}

// Render active session exercises and sets
function renderActiveWorkoutSession() {
  if (!state.activeSession) return;

  DOM.sessionTitle.textContent = state.activeSession.title;
  DOM.activeExercisesList.innerHTML = '';

  let totalSets = 0;
  let completedSets = 0;

  state.activeSession.exercises.forEach((ex, exIndex) => {
    const block = document.createElement('div');
    block.className = 'workout-exercise-block';

    const lastPerf = getLastExercisePerformance(ex.name);

    block.innerHTML = `
      <div class="workout-exercise-header">
        <div>
          <div class="workout-exercise-title">${escapeHtml(ex.name)}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted); display: flex; gap: 8px;">
            <span class="badge badge-muscle" style="font-size: 0.65rem;">${escapeHtml(ex.muscle || 'General')}</span>
            <span>⏱ ${escapeHtml(ex.restSeconds || 90)}s descanso</span>
          </div>
        </div>
        <button class="btn-icon btn-remove-ex-session" data-ex="${exIndex}" style="width: 32px; height: 32px; color: var(--text-dim);" title="Quitar ejercicio" aria-label="Quitar ejercicio de la sesión">
          ✕
        </button>
      </div>

      <table class="sets-table">
        <thead>
          <tr>
            <th>SET</th>
            <th>ANT.</th>
            <th>KG</th>
            <th>REPS</th>
            <th>✓</th>
          </tr>
        </thead>
        <tbody id="sets-body-${exIndex}">
          <!-- Sets rows -->
        </tbody>
      </table>

      <div class="workout-exercise-actions">
        <button class="btn btn-secondary btn-add-set" data-ex="${exIndex}" style="padding: 4px 12px; font-size: 0.78rem; min-height: 32px;">
          + Añadir Serie
        </button>
        <button class="btn btn-outline btn-remove-last-set" data-ex="${exIndex}" style="padding: 4px 10px; font-size: 0.75rem; min-height: 32px; color: var(--text-dim);">
          - Quitar Serie
        </button>
      </div>
    `;

    const tbody = block.querySelector(`#sets-body-${exIndex}`);

    ex.sets.forEach((set, setIndex) => {
      totalSets++;
      if (set.completed) completedSets++;

      const tr = document.createElement('tr');
      tr.className = `set-row ${set.completed ? 'completed' : ''}`;
      tr.innerHTML = `
        <td>${set.setNumber}</td>
        <td style="font-size: 0.75rem; color: var(--text-dim);">${escapeHtml(lastPerf || '-')}</td>
        <td>
          <div class="set-input-group">
            <input type="number" step="0.5" inputmode="decimal" class="set-input input-weight" 
                   data-ex="${exIndex}" data-set="${setIndex}" value="${escapeHtml(set.weight || 0)}" aria-label="Peso en kilogramos">
          </div>
        </td>
        <td>
          <div class="set-input-group">
            <input type="number" step="1" inputmode="numeric" class="set-input input-reps" 
                   data-ex="${exIndex}" data-set="${setIndex}" value="${escapeHtml(set.reps || 0)}" aria-label="Repeticiones">
          </div>
        </td>
        <td>
          <button class="btn-check-set ${set.completed ? 'completed' : ''}" 
                  data-ex="${exIndex}" data-set="${setIndex}" aria-label="Marcar serie ${set.setNumber} como completada">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </button>
        </td>
      `;

      // Input changes
      const inputWeight = tr.querySelector('.input-weight');
      const inputReps = tr.querySelector('.input-reps');

      inputWeight.addEventListener('change', () => {
        set.weight = parseFloat(inputWeight.value) || 0;
        state.saveActiveSession();
      });

      inputReps.addEventListener('change', () => {
        set.reps = parseInt(inputReps.value) || 0;
        state.saveActiveSession();
      });

      // Check button toggle
      const btnCheck = tr.querySelector('.btn-check-set');
      btnCheck.addEventListener('click', () => {
        soundManager.initContext();
        set.completed = !set.completed;
        state.saveActiveSession();

        if (set.completed) {
          soundManager.playCheckTone();
          soundManager.vibrate([80]);
          // Trigger rest timer
          triggerRestTimer(ex.restSeconds || state.settings.defaultRest || 90);
        }

        renderActiveWorkoutSession();
      });

      tbody.appendChild(tr);
    });

    // Add set button
    block.querySelector('.btn-add-set').addEventListener('click', () => {
      const lastSet = ex.sets[ex.sets.length - 1];
      ex.sets.push({
        setNumber: ex.sets.length + 1,
        weight: lastSet ? lastSet.weight : 0,
        reps: lastSet ? lastSet.reps : 10,
        completed: false
      });
      state.saveActiveSession();
      renderActiveWorkoutSession();
    });

    // Remove last set button
    block.querySelector('.btn-remove-last-set').addEventListener('click', () => {
      if (ex.sets.length > 1) {
        ex.sets.pop();
        state.saveActiveSession();
        renderActiveWorkoutSession();
      }
    });

    // Remove exercise button
    block.querySelector('.btn-remove-ex-session').addEventListener('click', () => {
      if (confirm(`¿Quitar "${ex.name}" de esta sesión?`)) {
        state.activeSession.exercises.splice(exIndex, 1);
        state.saveActiveSession();
        renderActiveWorkoutSession();
      }
    });

    DOM.activeExercisesList.appendChild(block);
  });

  // Update progress bar
  const pct = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;
  DOM.sessionProgressFill.style.width = `${pct}%`;
}

// Elapsed Time Stopwatch
function startSessionTimerClock() {
  stopSessionTimerClock();
  updateLiveClock();
  state.sessionTimerInterval = setInterval(updateLiveClock, 1000);
}

function stopSessionTimerClock() {
  if (state.sessionTimerInterval) {
    clearInterval(state.sessionTimerInterval);
    state.sessionTimerInterval = null;
  }
}

function updateLiveClock() {
  if (!state.activeSession) return;
  const elapsedSeconds = Math.floor((Date.now() - state.activeSession.startTime) / 1000);
  DOM.sessionLiveClock.textContent = formatDuration(elapsedSeconds);
}

// Add extra exercise to active session (opens the exercise modal in 'session' mode)
DOM.btnAddExerciseToSession.addEventListener('click', () => {
  if (!state.activeSession) return;
  openAddExerciseModal('session');
});

// Cancel active workout
DOM.btnCancelWorkout.addEventListener('click', () => {
  if (confirm('¿Descartar este entrenamiento? No se guardará en el historial.')) {
    state.activeSession = null;
    state.saveActiveSession();
    hideRestTimer();
    releaseWakeLock();
    renderWorkoutTab();
    showToast('Entrenamiento descartado');
  }
});

// Finish active workout
DOM.btnFinishWorkout.addEventListener('click', () => {
  if (!state.activeSession) return;

  const elapsedSeconds = Math.floor((Date.now() - state.activeSession.startTime) / 1000);

  // Compute stats
  let totalVolume = 0;
  let totalCompletedSets = 0;

  state.activeSession.exercises.forEach(ex => {
    ex.sets.forEach(s => {
      if (s.completed) {
        totalCompletedSets++;
        totalVolume += (parseFloat(s.weight) || 0) * (parseInt(s.reps) || 0);
      }
    });
  });

  DOM.summaryWorkoutName.textContent = state.activeSession.title;
  DOM.summaryDuration.textContent = formatDuration(elapsedSeconds);
  DOM.summaryVolume.textContent = `${totalVolume.toLocaleString()} kg`;
  DOM.summarySets.textContent = `${totalCompletedSets}`;
  DOM.summaryNotes.value = '';

  openModal(DOM.modalWorkoutSummary);
});

// Save finished workout to history
DOM.btnSaveSummary.addEventListener('click', () => {
  if (!state.activeSession) return;

  const elapsedSeconds = Math.max(1, Math.floor((Date.now() - state.activeSession.startTime) / 1000));
  let totalVolume = 0;
  let totalCompletedSets = 0;

  state.activeSession.exercises.forEach(ex => {
    ex.sets.forEach(s => {
      if (s.completed) {
        totalCompletedSets++;
        totalVolume += (parseFloat(s.weight) || 0) * (parseInt(s.reps) || 0);
      }
    });
  });

  const historyRecord = {
    id: state.activeSession.id || ('hist-' + Date.now()),
    date: new Date().toISOString(),
    title: state.activeSession.title,
    durationSeconds: elapsedSeconds,
    totalVolumeKg: totalVolume,
    totalSetsCompleted: totalCompletedSets,
    notes: DOM.summaryNotes.value.trim(),
    exercises: state.activeSession.exercises
  };

  state.history.unshift(historyRecord);
  state.saveHistory();

  // Clear session
  state.activeSession = null;
  state.saveActiveSession();
  hideRestTimer();
  releaseWakeLock();

  closeModal(DOM.modalWorkoutSummary);
  renderWorkoutTab();
  showToast('¡Entrenamiento registrado con éxito! 🎉');
  switchTab('tab-history');
});

// ============================================================
// REST TIMER (FLOATING WIDGET) - timestamp based, no drift
// ============================================================

function triggerRestTimer(seconds) {
  state.restEndsAt = Date.now() + seconds * 1000;
  state.isRestPaused = false;
  state.restTimerActive = true;
  DOM.btnTimerPause.textContent = '⏸';
  DOM.floatingRestTimer.style.display = 'flex';
  updateRestTimerUI();

  if (state.restTimerInterval) clearInterval(state.restTimerInterval);
  state.restTimerInterval = setInterval(tickRestTimer, 250);
}

function tickRestTimer() {
  if (!state.restTimerActive || state.isRestPaused) return;

  const remainingMs = state.restEndsAt - Date.now();
  if (remainingMs <= 0) {
    finishRestTimer();
    return;
  }
  updateRestTimerUI();
}

function finishRestTimer() {
  state.restTimerActive = false;
  if (state.restTimerInterval) {
    clearInterval(state.restTimerInterval);
    state.restTimerInterval = null;
  }
  soundManager.playRestCompleteTone();
  soundManager.vibrate([200, 100, 200]);
  DOM.restClockDisplay.textContent = '¡Listo!';
  showToast('⏰ ¡Tiempo de descanso completado! A por la siguiente serie');
  setTimeout(hideRestTimer, 3000);
}

function updateRestTimerUI() {
  const remainingMs = state.isRestPaused
    ? state.restPausedRemainingMs
    : state.restEndsAt - Date.now();
  const secs = Math.ceil(remainingMs / 1000);
  if (secs >= 0) {
    DOM.restClockDisplay.textContent = formatDuration(secs);
  }
}

function hideRestTimer() {
  state.restTimerActive = false;
  state.isRestPaused = false;
  if (state.restTimerInterval) {
    clearInterval(state.restTimerInterval);
    state.restTimerInterval = null;
  }
  DOM.floatingRestTimer.style.display = 'none';
}

DOM.btnTimerAdd30.addEventListener('click', () => {
  if (!state.restTimerActive) return;
  if (state.isRestPaused) {
    state.restPausedRemainingMs += 30000;
  } else {
    state.restEndsAt += 30000;
  }
  updateRestTimerUI();
});

DOM.btnTimerPause.addEventListener('click', () => {
  if (!state.restTimerActive) return;
  state.isRestPaused = !state.isRestPaused;
  if (state.isRestPaused) {
    state.restPausedRemainingMs = Math.max(0, state.restEndsAt - Date.now());
    DOM.btnTimerPause.textContent = '▶';
  } else {
    state.restEndsAt = Date.now() + state.restPausedRemainingMs;
    DOM.btnTimerPause.textContent = '⏸';
  }
  updateRestTimerUI();
});

DOM.btnTimerSkip.addEventListener('click', () => {
  hideRestTimer();
});

// ============================================================
// TAB 3: WORKOUT HISTORY & ANALYTICS
// ============================================================

let currentViewedHistoryId = null;

function renderHistoryTab() {
  const history = state.history || [];

  // Compute Overall Stats
  const totalWorkouts = history.length;
  let totalVolume = 0;
  let totalSets = 0;
  let totalSeconds = 0;

  history.forEach(item => {
    totalVolume += parseFloat(item.totalVolumeKg) || 0;
    totalSets += parseInt(item.totalSetsCompleted) || 0;
    totalSeconds += parseInt(item.durationSeconds) || 0;
  });

  DOM.statTotalWorkouts.textContent = totalWorkouts;
  DOM.statTotalVolume.innerHTML = `${Math.round(totalVolume).toLocaleString()} <span>kg</span>`;
  DOM.statTotalSets.textContent = totalSets;
  DOM.statTotalTime.innerHTML = `${formatDurationHours(totalSeconds)} <span>h</span>`;
  DOM.historyTotalCount.textContent = `${totalWorkouts} ${totalWorkouts === 1 ? 'registro' : 'registros'}`;

  DOM.historyList.innerHTML = '';

  if (history.length === 0) {
    DOM.historyList.innerHTML = `
      <div class="empty-state">
        <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
        <h3>No tienes entrenamientos registrados</h3>
        <p>Completa tu primera sesión de entrenamiento para ver aquí todo tu progreso, cargas y estadísticas.</p>
        <button class="btn btn-primary" id="btn-empty-goto-workout">Ir a Entrenar</button>
      </div>
    `;
    document.getElementById('btn-empty-goto-workout').addEventListener('click', () => switchTab('tab-workout'));
    return;
  }

  history.forEach(item => {
    const card = document.createElement('div');
    card.className = 'history-card';
    card.innerHTML = `
      <div class="history-card-header">
        <div>
          <div class="history-routine-title">${escapeHtml(item.title)}</div>
          <div class="history-date">${escapeHtml(formatDateSpanish(item.date))}</div>
        </div>
        <span class="badge badge-active">${escapeHtml(formatDuration(item.durationSeconds || 0))}</span>
      </div>
      <div class="history-card-metrics">
        <div class="metric-item">
          <strong>${escapeHtml(Number(item.totalVolumeKg || 0).toLocaleString())}</strong> kg
        </div>
        <div class="metric-item">
          <strong>${escapeHtml(item.totalSetsCompleted || 0)}</strong> series
        </div>
        <div class="metric-item">
          <strong>${escapeHtml((item.exercises || []).length)}</strong> ejercicios
        </div>
      </div>
      ${item.notes ? `<div style="font-size: 0.78rem; color: var(--text-dim); margin-top: 8px; font-style: italic;">📝 "${escapeHtml(item.notes)}"</div>` : ''}
    `;

    card.addEventListener('click', () => {
      openHistoryDetail(item);
    });

    DOM.historyList.appendChild(card);
  });
}

function openHistoryDetail(item) {
  currentViewedHistoryId = item.id;
  DOM.historyDetailTitle.textContent = item.title;
  DOM.historyDetailDate.textContent = `${formatDateSpanish(item.date)} • Duración: ${formatDuration(item.durationSeconds || 0)}`;

  DOM.historyDetailContent.innerHTML = '';

  (item.exercises || []).forEach((ex, idx) => {
    const exDiv = document.createElement('div');
    exDiv.style.marginBottom = '16px';
    exDiv.style.paddingBottom = '12px';
    exDiv.style.borderBottom = '1px solid var(--border-color)';

    let setsHtml = '';
    (ex.sets || []).forEach(s => {
      setsHtml += `
        <div style="display: flex; justify-content: space-between; font-size: 0.85rem; padding: 4px 0; color: ${s.completed ? '#e2e8f0' : 'var(--text-dim)'};">
          <span>Serie ${escapeHtml(s.setNumber)}:</span>
          <span><strong>${escapeHtml(s.weight)} kg</strong> × <strong>${escapeHtml(s.reps)} reps</strong> ${s.completed ? '✓' : '(no completada)'}</span>
        </div>
      `;
    });

    exDiv.innerHTML = `
      <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 6px; color: var(--primary-light);">
        ${idx + 1}. ${escapeHtml(ex.name)} <span class="badge badge-muscle" style="font-size: 0.65rem;">${escapeHtml(ex.muscle || '')}</span>
      </div>
      ${setsHtml}
    `;

    DOM.historyDetailContent.appendChild(exDiv);
  });

  if (item.notes) {
    const notesDiv = document.createElement('div');
    notesDiv.style.fontSize = '0.85rem';
    notesDiv.style.color = 'var(--text-muted)';
    notesDiv.innerHTML = `<strong>Notas:</strong> ${escapeHtml(item.notes)}`;
    DOM.historyDetailContent.appendChild(notesDiv);
  }

  openModal(DOM.modalHistoryDetail);
}

DOM.btnDeleteHistoryItem.addEventListener('click', () => {
  if (!currentViewedHistoryId) return;
  if (confirm('¿Eliminar este entrenamiento del historial?')) {
    state.history = state.history.filter(h => h.id !== currentViewedHistoryId);
    state.saveHistory();
    closeModal(DOM.modalHistoryDetail);
    renderHistoryTab();
    showToast('Registro eliminado');
  }
});

// ============================================================
// TAB 4: SETTINGS & BACKUP/RESTORE
// ============================================================

function renderSettingsTab() {
  DOM.settingSound.checked = !!state.settings.sound;
  DOM.settingVibrate.checked = !!state.settings.vibrate;
  DOM.settingDefaultRest.value = state.settings.defaultRest || 90;
}

DOM.settingSound.addEventListener('change', () => {
  state.settings.sound = DOM.settingSound.checked;
  state.saveSettings();
  if (state.settings.sound) soundManager.playCheckTone();
});

DOM.settingVibrate.addEventListener('change', () => {
  state.settings.vibrate = DOM.settingVibrate.checked;
  state.saveSettings();
  if (state.settings.vibrate) soundManager.vibrate([100]);
});

DOM.settingDefaultRest.addEventListener('change', () => {
  state.settings.defaultRest = parseInt(DOM.settingDefaultRest.value) || 90;
  state.saveSettings();
  showToast('Tiempo de descanso predeterminado guardado');
});

// Export JSON Backup
DOM.btnExportData.addEventListener('click', () => {
  const backupData = {
    version: '1.0',
    exportDate: new Date().toISOString(),
    routine: state.routine,
    history: state.history,
    settings: state.settings
  };

  const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const now = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `fittrack_backup_${now}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('Copia de seguridad descargada (JSON)');
});

// Import JSON Backup
DOM.btnImportTrigger.addEventListener('click', () => {
  DOM.fileImportInput.click();
});

function isValidRoutineDay(day) {
  return day && typeof day === 'object' &&
    Number.isInteger(day.dayId) && day.dayId >= 1 && day.dayId <= 7;
}

function sanitizeSettings(raw) {
  const s = { sound: true, vibrate: true, defaultRest: 90 };
  if (!raw || typeof raw !== 'object') return s;
  if (typeof raw.sound === 'boolean') s.sound = raw.sound;
  if (typeof raw.vibrate === 'boolean') s.vibrate = raw.vibrate;
  const rest = parseInt(raw.defaultRest);
  if ([45, 60, 90, 120, 180].indexOf(rest) !== -1) s.defaultRest = rest;
  return s;
}

DOM.fileImportInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      if (!data || typeof data !== 'object' || Array.isArray(data)) {
        throw new Error('bad-format');
      }
      if (data.version && data.version !== '1.0') {
        alert('La copia de seguridad usa una versión (' + data.version + ') no soportada por esta app.');
        return;
      }

      let importedSomething = false;

      if (Array.isArray(data.routine)) {
        const validRoutine = data.routine.filter(isValidRoutineDay);
        if (validRoutine.length === 0) {
          alert('El archivo no contiene una rutina semanal válida.');
          return;
        }
        state.routine = validRoutine;
        state.saveRoutine();
        importedSomething = true;
      }

      if (Array.isArray(data.history)) {
        const validHistory = data.history.filter(h => h && typeof h === 'object' && Array.isArray(h.exercises));
        state.history = validHistory.map((h, i) => {
          if (!h.id) h.id = 'hist-import-' + Date.now() + '-' + i;
          if (typeof h.title !== 'string') h.title = 'Entrenamiento';
          return h;
        });
        state.saveHistory();
        importedSomething = true;
      }

      if (data.settings) {
        state.settings = sanitizeSettings(data.settings);
        state.saveSettings();
        importedSomething = true;
      }

      if (!importedSomething) {
        alert('El archivo no parece una copia de seguridad de FitTrack (faltan routine/history/settings).');
        return;
      }

      renderSettingsTab();
      renderRoutineTab();
      showToast('¡Datos importados con éxito!');
    } catch (err) {
      alert('Error al leer el archivo JSON. Verifica que sea una copia de seguridad válida.');
    } finally {
      e.target.value = '';
    }
  };
  reader.readAsText(file);
});

// Reset to default template
DOM.btnResetDemo.addEventListener('click', () => {
  if (confirm('¿Restablecer la rutina a los valores de ejemplo originales (Push/Pull/Legs)? Tu historial no se borrará.')) {
    state.routine = JSON.parse(JSON.stringify(TEMPLATES.ppl));
    state.saveRoutine();
    renderRoutineTab();
    showToast('Rutina restablecida');
  }
});

// ============================================================
// SCREEN WAKE LOCK (keep screen awake during live workouts)
// ============================================================

let wakeLock = null;

async function acquireWakeLock() {
  try {
    if ('wakeLock' in navigator && state.activeSession && !wakeLock) {
      wakeLock = await navigator.wakeLock.request('screen');
      wakeLock.addEventListener('release', () => { wakeLock = null; });
    }
  } catch (e) {
    // Not supported (e.g. iOS Safari) or denied - workout continues normally
  }
}

function releaseWakeLock() {
  if (wakeLock) {
    try { wakeLock.release(); } catch (e) {}
    wakeLock = null;
  }
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && state.activeSession) {
    acquireWakeLock();
  }
});

// ============================================================
// SERVICE WORKER REGISTRATION (OFFLINE SUPPORT)
// ============================================================

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('FitTrack PWA Service Worker registrado'))
      .catch(err => console.log('Service Worker error:', err));
  });
}

// ============================================================
// INITIAL APPLICATION MOUNT
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  renderRoutineTab();
  if (state.activeSession) {
    DOM.navWorkoutPulse.style.display = 'block';
  }
});
