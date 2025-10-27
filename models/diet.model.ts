import { Schema, model, models } from 'mongoose';

// --- Sub-esquema para las Comidas (la tarjeta "Protein Oatmeal Bowl") ---
const MealSchema = new Schema({
  name: {
    type: String, // "Protein Oatmeal Bowl"
    required: true,
  },
  description: {
    type: String, // "Start your day with complex carbs..."
  },
  tag: {
    type: String, // "Breakfast"
  },
  time: {
    type: String, // "7:00 AM"
  },
  isCompleted: {
    type: Boolean, // Para el círculo de "completado"
    default: false,
  },

  // --- Totales de la Comida (Valores guardados) ---
  // Los números que se muestran en la tarjeta de comida
  calories: {
    type: Number, // 450
  },
  protein: {
    type: Number, // 25
  },
  carbs: {
    type: Number, // 58
  },
  fats: {
    type: Number, // 12
  },
  
  // --- Lista de Ingredientes (Simple) ---
  // Simplemente guardamos los strings tal cual los queremos mostrar
  ingredients: [String], // Ej: ["Oats (100g)", "Banana (1 medium)", "Protein powder (30g)"]

});


// --- El Modelo Principal de la DiTA ---
// (Corresponde a toda la pantalla)
const DietSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true, // Para encontrar dietas por usuario rápidamente
  },
  date: {
    type: Date, // Para qué día es esta dieta
    required: true,
  },

  // Corresponde al bloque "Daily Nutrition Goals"
  goals: {
    targetCalories: { type: Number, default: 0 }, // 2600
    targetProtein: { type: Number, default: 0 },  // 180g
    targetCarbs: { type: Number, default: 0 },    // 250g
    targetFats: { type: Number, default: 0 },      // 80g
  },

  // Un array que contendrá todas las tarjetas de comida
  meals: [MealSchema],

}, { timestamps: true });

// Esto evita errores en 'hot reload' (recarga en vivo)
const Diet = models.Diet || model('Diet', DietSchema);
export default Diet;