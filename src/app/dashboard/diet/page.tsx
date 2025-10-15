'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Meal {
  id: string;
  name: string;
  time: string;
  timeLabel: string;
  image: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  weight: string;
  description: string;
  ingredients: string[];
  completed: boolean;
}

export default function DietPage() {
  const [meals, setMeals] = useState<Meal[]>([
    {
      id: '1',
      name: 'Protein Oatmeal Bowl',
      time: '7:00 AM',
      timeLabel: 'Breakfast',
      image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=800&q=80',
      calories: 450,
      protein: 25,
      carbs: 58,
      fats: 12,
      weight: '350g',
      description: 'Start your day with complex carbs and protein for sustained energy',
      ingredients: ['Oats (100g)', 'Banana (1 medium)', 'Protein powder (30g)', 'Almond butter (15g)', 'Berries (50g)', 'Honey (10g)'],
      completed: false,
    },
    {
      id: '2',
      name: 'Greek Yogurt & Nuts',
      time: '10:00 AM',
      timeLabel: 'Morning Snack',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80',
      calories: 280,
      protein: 20,
      carbs: 22,
      fats: 14,
      weight: '200g',
      description: 'High-protein snack to keep you full until lunch',
      ingredients: ['Greek yogurt (150g)', 'Mixed nuts (30g)', 'Honey (10g)', 'Chia seeds (10g)'],
      completed: false,
    },
    {
      id: '3',
      name: 'Grilled Chicken & Quinoa',
      time: '1:00 PM',
      timeLabel: 'Lunch',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
      calories: 620,
      protein: 52,
      carbs: 48,
      fats: 18,
      weight: '450g',
      description: 'Balanced meal with lean protein and complex carbohydrates',
      ingredients: ['Chicken breast (200g)', 'Quinoa (150g)', 'Mixed vegetables (100g)', 'Olive oil (1 tbsp)'],
      completed: false,
    },
    {
      id: '4',
      name: 'Protein Shake & Apple',
      time: '4:00 PM',
      timeLabel: 'Pre-Workout',
      image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=800&q=80',
      calories: 350,
      protein: 35,
      carbs: 42,
      fats: 8,
      weight: '450g',
      description: 'Quick energy boost before your workout session',
      ingredients: ['Protein powder (40g)', 'Banana (1 medium)', 'Almond milk (300ml)', 'Apple (1 medium)', 'Peanut butter (15g)'],
      completed: false,
    },
    {
      id: '5',
      name: 'Salmon & Sweet Potato',
      time: '7:30 PM',
      timeLabel: 'Dinner',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80',
      calories: 680,
      protein: 48,
      carbs: 54,
      fats: 26,
      weight: '500g',
      description: 'Omega-3 rich protein with complex carbs for recovery',
      ingredients: ['Salmon fillet (200g)', 'Sweet potato (200g)', 'Broccoli (100g)', 'Asparagus (50g)', 'Lemon butter sauce (20g)'],
      completed: false,
    },
    {
      id: '6',
      name: 'Cottage Cheese & Berries',
      time: '10:00 PM',
      timeLabel: 'Evening Snack',
      image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&q=80',
      calories: 220,
      protein: 24,
      carbs: 18,
      fats: 6,
      weight: '200g',
      description: 'Slow-digesting protein for overnight muscle recovery',
      ingredients: ['Cottage cheese (150g)', 'Mixed berries (50g)', 'Almonds (10g)'],
      completed: false,
    },
  ]);

  const toggleMealCompletion = (mealId: string) => {
    setMeals((prev) =>
      prev.map((meal) =>
        meal.id === mealId ? { ...meal, completed: !meal.completed } : meal
      )
    );
  };

  const totalNutrition = meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fats: acc.fats + meal.fats,
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  const completedMeals = meals.filter((meal) => meal.completed).length;
  const progressPercentage = (completedMeals / meals.length) * 100;

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-black">My Diet Plan</h1>
          <div className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium">
            AI Optimized
          </div>
        </div>
        <p className="text-gray-600">Track your daily nutrition and meal times</p>
      </div>

      {/* Daily Nutrition Summary */}
      <div className="bg-gradient-to-r from-black to-gray-800 text-white rounded-xl p-6 mb-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Daily Nutrition Goals</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold">{totalNutrition.calories}</div>
            <div className="text-sm text-gray-300">Calories</div>
            <div className="text-xs text-gray-400 mt-1">Target: 2600</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold">{totalNutrition.protein}g</div>
            <div className="text-sm text-gray-300">Protein</div>
            <div className="text-xs text-gray-400 mt-1">Target: 180g</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold">{totalNutrition.carbs}g</div>
            <div className="text-sm text-gray-300">Carbs</div>
            <div className="text-xs text-gray-400 mt-1">Target: 250g</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold">{totalNutrition.fats}g</div>
            <div className="text-sm text-gray-300">Fats</div>
            <div className="text-xs text-gray-400 mt-1">Target: 80g</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span>Meals Completed</span>
            <span className="font-semibold">
              {completedMeals}/{meals.length} meals
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div
              className="bg-white h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Meals List */}
      <div className="space-y-4">
        {meals.map((meal) => (
          <div
            key={meal.id}
            className={`bg-white rounded-xl overflow-hidden border-2 transition-all duration-200 ${
              meal.completed
                ? 'border-black opacity-75'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
            }`}
          >
            <div className="flex flex-col md:flex-row">
              {/* Image Section */}
              <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0">
                <Image
                  src={meal.image}
                  alt={meal.name}
                  fill
                  className={`object-cover ${meal.completed ? 'grayscale' : ''}`}
                  unoptimized
                />
                <div className="absolute top-3 left-3 bg-black/80 text-white px-3 py-1 rounded-lg text-sm font-medium backdrop-blur-sm">
                  {meal.time}
                </div>
                <div className="absolute top-3 right-3 bg-white/90 text-black px-3 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm">
                  {meal.weight}
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3
                        className={`text-xl font-bold ${
                          meal.completed ? 'text-gray-500 line-through' : 'text-black'
                        }`}
                      >
                        {meal.name}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          meal.completed
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {meal.timeLabel}
                      </span>
                    </div>
                    <p className={`text-sm mb-3 ${meal.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                      {meal.description}
                    </p>
                  </div>
                  
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleMealCompletion(meal.id)}
                    className="flex-shrink-0 ml-4"
                  >
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        meal.completed
                          ? 'bg-black border-black'
                          : 'border-gray-300 hover:border-black'
                      }`}
                    >
                      {meal.completed && (
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </button>
                </div>

                {/* Nutrition Info */}
                <div className="grid grid-cols-4 gap-3 mb-3">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className={`text-lg font-bold ${meal.completed ? 'text-gray-400' : 'text-black'}`}>
                      {meal.calories}
                    </div>
                    <div className="text-xs text-gray-500">Calories</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className={`text-lg font-bold ${meal.completed ? 'text-gray-400' : 'text-black'}`}>
                      {meal.protein}g
                    </div>
                    <div className="text-xs text-gray-500">Protein</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className={`text-lg font-bold ${meal.completed ? 'text-gray-400' : 'text-black'}`}>
                      {meal.carbs}g
                    </div>
                    <div className="text-xs text-gray-500">Carbs</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className={`text-lg font-bold ${meal.completed ? 'text-gray-400' : 'text-black'}`}>
                      {meal.fats}g
                    </div>
                    <div className="text-xs text-gray-500">Fats</div>
                  </div>
                </div>

                {/* Ingredients */}
                <div>
                  <h4 className={`text-sm font-semibold mb-2 ${meal.completed ? 'text-gray-400' : 'text-gray-700'}`}>
                    Ingredients:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {meal.ingredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-xs ${
                          meal.completed
                            ? 'bg-gray-100 text-gray-400'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Daily Summary */}
      {completedMeals === meals.length && (
        <div className="mt-6 bg-green-50 border-2 border-green-500 rounded-xl p-6 text-center">
          <h3 className="text-2xl font-bold text-green-800 mb-2">🎉 All Meals Completed!</h3>
          <p className="text-green-700 mb-4">
            You&apos;ve hit your nutrition targets for today. Great job staying on track!
          </p>
          <button className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200">
            Log Daily Progress
          </button>
        </div>
      )}
    </div>
  );
}
