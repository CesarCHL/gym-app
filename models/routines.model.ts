import { Schema, model, models } from 'mongoose';

// --- Sub-esquema para cada Ejercicio ---
// (Deadlifts, Pull-ups, etc.)
const ExerciseSchema = new Schema({
  name: {
    type: String, // "Deadlifts"
    required: true,
  },
  isCompleted: {
    type: Boolean, // El checkbox
    default: false,
  },
  // Guardamos esto como texto simple para mostrarlo directamente
  sets: {
    type: String, // "4 sets"
  },
  reps: {
    type: String, // "6-8 reps"
  },
  weight: {
    type: String, // "275 lbs" (es opcional)
  },
  note: {
    type: String, // "⚡️ Maintain neutral spine" (es opcional)
  },
});


// --- Sub-esquema para el Día de Entrenamiento ---
// (El bloque "Friday's Workout")
const WorkoutDaySchema = new Schema({
  // El nombre para la pestaña
  dayName: {
    type: String, // "Monday", "Wednesday", "Friday"
    required: true,
  },
  // El título del bloque de entrenamiento
  title: {
    type: String, // "Friday's Workout"
    required: true,
  },
  // La etiqueta o subtítulo
  tag: {
    type: String, // "Upper Body - Pull"
  },
  // El array de ejercicios para ese día
  exercises: [ExerciseSchema],
});


// --- El Modelo Principal de la RUTINA ---
// (Corresponde a toda la pantalla)
const RoutineSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  name: {
    type: String, // "My Routine"
  },
  // Un array que contendrá los días de entrenamiento de la semana
  // Ej: [ {dayName: "Monday", ...}, {dayName: "Wednesday", ...}, {dayName: "Friday", ...} ]
  week: [WorkoutDaySchema],
  
}, { timestamps: true });

// Evita errores en 'hot reload'
const Routine = models.Routine || model('Routine', RoutineSchema);
export default Routine;