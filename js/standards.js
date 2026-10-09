/**
 * FitTrack - Estandares de fuerza por ejercicio
 * ------------------------------------------------
 * Cada entrada define umbrales para 5 niveles:
 *   1 Novato | 2 Principiante | 3 Intermedio | 4 Avanzado | 5 Elite
 *
 * - type 'orm'  : umbrales como multiplos del peso corporal, comparados
 *                 contra el 1RM estimado (formula de Epley: peso * (1 + reps/30))
 * - type 'reps' : umbrales absolutos de repeticiones (ejercicios con el
 *                 peso corporal: dominadas, fondos, plancha...)
 *
 * "Intermedio" representa aproximadamente la media de personas entrenadas.
 *
 * EL ORDEN IMPORTA: se evalua de arriba hacia abajo y gana la primera
 * coincidencia (por eso las entradas mas especificas van primero).
 */

const STRENGTH_LEVELS = [
  { id: 1, name: 'Novato', color: '#64748b' },
  { id: 2, name: 'Principiante', color: '#38bdf8' },
  { id: 3, name: 'Intermedio', color: '#22c55e' },
  { id: 4, name: 'Avanzado', color: '#f59e0b' },
  { id: 5, name: 'Élite', color: '#ef4444' }
];

const STRENGTH_STANDARDS = [
  // ===================== ESPALDA =====================
  { id: 'pullup', match: ['dominada', 'pull up', 'pullup', 'chin up', 'muscle up'], muscle: 'Espalda', type: 'reps', b: [1, 5, 8, 12] },
  { id: 'pulldown', match: ['jalon', 'lat pulldown', 'pulldown'], muscle: 'Espalda', type: 'orm', b: [0.6, 0.85, 1.05, 1.3] },
  { id: 'rdl', match: ['peso muerto rumano', 'rumano', 'romanian deadlift', 'rdl'], muscle: 'Espalda', type: 'orm', b: [0.8, 1.2, 1.6, 2.1] },
  { id: 'deadlift', match: ['peso muerto', 'deadlift'], muscle: 'Espalda', type: 'orm', b: [0.9, 1.4, 1.9, 2.5] },
  { id: 'barbell-row', match: ['remo con barra', 'bent over row'], muscle: 'Espalda', type: 'orm', b: [0.6, 0.9, 1.2, 1.6] },
  { id: 'db-row', match: ['remo unilateral', 'remo con mancuerna', 'unilateral con mancuerna', 'dumbbell row'], muscle: 'Espalda', type: 'orm', b: [0.2, 0.3, 0.42, 0.55] },
  { id: 'cable-row', match: ['gironda', 'polea baja', 'seated row', 'remo en polea'], muscle: 'Espalda', type: 'orm', b: [0.45, 0.7, 0.9, 1.2] },
  { id: 'pullover', match: ['pullover'], muscle: 'Espalda', type: 'orm', b: [0.25, 0.4, 0.55, 0.75] },
  { id: 'row-generic', match: ['remo', 'row'], muscle: 'Espalda', type: 'orm', b: [0.55, 0.8, 1.05, 1.35] },

  // ===================== PECHO =====================
  { id: 'bench', match: ['press de banca', 'press banca', 'banca plano', 'bench press', 'bench'], muscle: 'Pecho', type: 'orm', b: [0.65, 1.0, 1.4, 1.75] },
  { id: 'incline-db-press', match: ['press inclinado con mancuerna', 'inclinado con mancuerna', 'press inclinado mancuerna', 'inclinado mancuerna'], muscle: 'Pecho', type: 'orm', b: [0.18, 0.28, 0.38, 0.5] },
  { id: 'incline-press', match: ['press inclinado', 'incline press', 'incline bench'], muscle: 'Pecho', type: 'orm', b: [0.5, 0.75, 1.0, 1.3] },
  { id: 'dips', match: ['fondos', 'dips'], muscle: 'Pecho', type: 'reps', b: [2, 6, 10, 15] },
  { id: 'fly', match: ['apertura', 'cruce', 'crossover', 'pec deck'], muscle: 'Pecho', type: 'orm', b: [0.1, 0.18, 0.27, 0.4] },

  // ===================== HOMBRO =====================
  { id: 'ohp-db', match: ['press militar con mancuerna', 'press de hombro con mancuerna', 'militar con mancuerna', 'shoulder press dumbbell'], muscle: 'Hombro', type: 'orm', b: [0.12, 0.2, 0.28, 0.38] },
  { id: 'ohp', match: ['press militar', 'press de hombro', 'overhead press', 'ohp'], muscle: 'Hombro', type: 'orm', b: [0.45, 0.65, 0.85, 1.1] },
  { id: 'face-pull', match: ['face pull', 'facepull'], muscle: 'Hombro', type: 'orm', b: [0.15, 0.25, 0.35, 0.5] },
  { id: 'lateral-raise', match: ['lateral'], muscle: 'Hombro', type: 'orm', b: [0.05, 0.09, 0.14, 0.2] },

  // ===================== TRICEPS =====================
  { id: 'french-press', match: ['frances', 'skull crusher'], muscle: 'Tríceps', type: 'orm', b: [0.2, 0.32, 0.45, 0.6] },
  { id: 'triceps', match: ['triceps', 'pushdown'], muscle: 'Tríceps', type: 'orm', b: [0.25, 0.4, 0.55, 0.75] },

  // ===================== PIERNA (antes que biceps: "Curl Femoral") =====================
  { id: 'ham-curl', match: ['femoral', 'hamstring', 'leg curl'], muscle: 'Pierna', type: 'orm', b: [0.35, 0.55, 0.75, 1.0] },

  // ===================== BICEPS =====================
  { id: 'hammer-curl', match: ['martillo', 'hammer'], muscle: 'Bíceps', type: 'orm', b: [0.12, 0.18, 0.25, 0.35] },
  { id: 'ez-curl', match: ['barra z', 'ez bar', 'curl con barra', 'curl de barra'], muscle: 'Bíceps', type: 'orm', b: [0.25, 0.4, 0.55, 0.75] },
  { id: 'curl', match: ['curl'], muscle: 'Bíceps', type: 'orm', b: [0.12, 0.18, 0.25, 0.35] },
  { id: 'biceps-generic', match: ['biceps', 'bicep'], muscle: 'Bíceps', type: 'orm', b: [0.12, 0.18, 0.25, 0.35] },

  // ===================== CORE =====================
  { id: 'plank', match: ['plancha', 'plank'], muscle: 'Core', type: 'reps', b: [30, 45, 60, 90] },
  { id: 'leg-raise', match: ['elevacion de piernas', 'piernas colgado', 'leg raise'], muscle: 'Core', type: 'reps', b: [5, 10, 15, 20] },
  { id: 'crunch', match: ['crunch', 'abdominal'], muscle: 'Core', type: 'orm', b: [0.25, 0.4, 0.55, 0.8] },

  // ===================== PIERNA =====================
  { id: 'lunge', match: ['zancada', 'bulgara', 'lunge'], muscle: 'Pierna', type: 'orm', b: [0.15, 0.25, 0.35, 0.5] },
  { id: 'squat', match: ['sentadilla', 'squat'], muscle: 'Pierna', type: 'orm', b: [0.7, 1.1, 1.5, 2.0] },
  { id: 'leg-press', match: ['prensa', 'leg press'], muscle: 'Pierna', type: 'orm', b: [1.4, 2.2, 3.0, 4.0] },
  { id: 'leg-extension', match: ['cuadriceps', 'leg extension'], muscle: 'Pierna', type: 'orm', b: [0.4, 0.65, 0.9, 1.2] },
  { id: 'hip-thrust', match: ['hip thrust', 'hipthrust', 'puente de gluteo'], muscle: 'Pierna', type: 'orm', b: [0.9, 1.5, 2.2, 3.0] },
  { id: 'calf', match: ['gemelo', 'talon', 'pantorrilla', 'calf'], muscle: 'Pierna', type: 'orm', b: [0.6, 1.0, 1.4, 1.9] }
];

// Normaliza un nombre de ejercicio: minusculas, sin acentos, espacios simples
function normalizeExerciseName(name) {
  return String(name || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Busca el estandar de fuerza de un ejercicio por su nombre (normalizado).
// Devuelve la entrada o null si no hay estandar conocido.
function findStrengthStandard(name) {
  const n = normalizeExerciseName(name);
  if (!n) return null;
  for (let i = 0; i < STRENGTH_STANDARDS.length; i++) {
    const std = STRENGTH_STANDARDS[i];
    for (let j = 0; j < std.match.length; j++) {
      if (n.indexOf(std.match[j]) !== -1) return std;
    }
  }
  return null;
}
