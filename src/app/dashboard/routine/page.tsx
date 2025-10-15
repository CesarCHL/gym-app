'use client';

import { useState } from 'react';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight?: string;
  notes?: string;
  completed: boolean;
}

interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
}

export default function RoutinePage() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [routine, setRoutine] = useState<WorkoutDay[]>([
    {
      day: 'Monday',
      focus: 'Upper Body - Push',
      exercises: [
        {
          id: '1',
          name: 'Bench Press',
          sets: 4,
          reps: '8-10',
          weight: '185 lbs',
          notes: 'Focus on controlled movement',
          completed: false,
        },
        {
          id: '2',
          name: 'Incline Dumbbell Press',
          sets: 3,
          reps: '10-12',
          weight: '60 lbs each',
          completed: false,
        },
        {
          id: '3',
          name: 'Shoulder Press',
          sets: 3,
          reps: '8-10',
          weight: '95 lbs',
          completed: false,
        },
        {
          id: '4',
          name: 'Lateral Raises',
          sets: 3,
          reps: '12-15',
          weight: '20 lbs each',
          completed: false,
        },
        {
          id: '5',
          name: 'Tricep Dips',
          sets: 3,
          reps: '10-12',
          notes: 'Bodyweight or add weight if needed',
          completed: false,
        },
      ],
    },
    {
      day: 'Wednesday',
      focus: 'Lower Body',
      exercises: [
        {
          id: '6',
          name: 'Squats',
          sets: 4,
          reps: '8-10',
          weight: '225 lbs',
          notes: 'Go below parallel',
          completed: false,
        },
        {
          id: '7',
          name: 'Romanian Deadlifts',
          sets: 3,
          reps: '10-12',
          weight: '185 lbs',
          completed: false,
        },
        {
          id: '8',
          name: 'Leg Press',
          sets: 3,
          reps: '12-15',
          weight: '315 lbs',
          completed: false,
        },
        {
          id: '9',
          name: 'Leg Curls',
          sets: 3,
          reps: '12-15',
          weight: '90 lbs',
          completed: false,
        },
        {
          id: '10',
          name: 'Calf Raises',
          sets: 4,
          reps: '15-20',
          weight: '185 lbs',
          completed: false,
        },
      ],
    },
    {
      day: 'Friday',
      focus: 'Upper Body - Pull',
      exercises: [
        {
          id: '11',
          name: 'Deadlifts',
          sets: 4,
          reps: '6-8',
          weight: '275 lbs',
          notes: 'Maintain neutral spine',
          completed: false,
        },
        {
          id: '12',
          name: 'Pull-ups',
          sets: 4,
          reps: '8-10',
          notes: 'Use assisted machine if needed',
          completed: false,
        },
        {
          id: '13',
          name: 'Barbell Rows',
          sets: 3,
          reps: '10-12',
          weight: '135 lbs',
          completed: false,
        },
        {
          id: '14',
          name: 'Face Pulls',
          sets: 3,
          reps: '15-20',
          weight: '70 lbs',
          completed: false,
        },
        {
          id: '15',
          name: 'Bicep Curls',
          sets: 3,
          reps: '10-12',
          weight: '35 lbs each',
          completed: false,
        },
      ],
    },
  ]);

  const toggleExerciseCompletion = (dayIndex: number, exerciseId: string) => {
    setRoutine((prev) => {
      const newRoutine = [...prev];
      const exercise = newRoutine[dayIndex].exercises.find((ex) => ex.id === exerciseId);
      if (exercise) {
        exercise.completed = !exercise.completed;
      }
      return newRoutine;
    });
  };

  const currentDay = routine[selectedDay];
  const completedCount = currentDay.exercises.filter((ex) => ex.completed).length;
  const totalCount = currentDay.exercises.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-black">My Routine</h1>
          <div className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium">
            AI Generated
          </div>
        </div>
        <p className="text-gray-600">Complete your daily workout tasks</p>
      </div>

      {/* Day Selector */}
      <div className="flex gap-2 md:gap-4 mb-6 overflow-x-auto pb-2">
        {routine.map((day, index) => {
          const dayCompleted = day.exercises.filter((ex) => ex.completed).length;
          const dayTotal = day.exercises.length;
          return (
            <button
              key={index}
              onClick={() => setSelectedDay(index)}
              className={`flex-shrink-0 px-6 py-4 rounded-xl transition-all duration-200 ${
                selectedDay === index
                  ? 'bg-black text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <div className="font-semibold text-lg">{day.day}</div>
              <div className={`text-sm mt-1 ${selectedDay === index ? 'text-gray-300' : 'text-gray-500'}`}>
                {dayCompleted}/{dayTotal} done
              </div>
            </button>
          );
        })}
      </div>

      {/* Workout Info Card */}
      <div className="bg-gradient-to-r from-black to-gray-800 text-white rounded-xl p-6 mb-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-2">{currentDay.day}&apos;s Workout</h2>
        <p className="text-gray-300 mb-4">{currentDay.focus}</p>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span>Progress</span>
            <span className="font-semibold">
              {completedCount}/{totalCount} exercises
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

      {/* Exercise List */}
      <div className="space-y-3">
        {currentDay.exercises.map((exercise) => (
          <div
            key={exercise.id}
            onClick={() => toggleExerciseCompletion(selectedDay, exercise.id)}
            className={`bg-white rounded-xl p-5 border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${
              exercise.completed
                ? 'border-black bg-gray-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Checkbox */}
              <div className="flex-shrink-0 mt-1">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    exercise.completed
                      ? 'bg-black border-black'
                      : 'border-gray-300 hover:border-black'
                  }`}
                >
                  {exercise.completed && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Exercise Info */}
              <div className="flex-1">
                <h3
                  className={`font-bold text-lg mb-1 ${
                    exercise.completed ? 'text-gray-500 line-through' : 'text-black'
                  }`}
                >
                  {exercise.name}
                </h3>
                <div className="flex flex-wrap gap-4 text-sm mb-2">
                  <span className={exercise.completed ? 'text-gray-400' : 'text-gray-600'}>
                    <span className="font-semibold">{exercise.sets}</span> sets
                  </span>
                  <span className={exercise.completed ? 'text-gray-400' : 'text-gray-600'}>
                    <span className="font-semibold">{exercise.reps}</span> reps
                  </span>
                  {exercise.weight && (
                    <span className={exercise.completed ? 'text-gray-400' : 'text-gray-600'}>
                      <span className="font-semibold">{exercise.weight}</span>
                    </span>
                  )}
                </div>
                {exercise.notes && (
                  <p className={`text-sm italic ${exercise.completed ? 'text-gray-400' : 'text-gray-500'}`}>
                    💡 {exercise.notes}
                  </p>
                )}
              </div>

              {/* Status Badge */}
              {exercise.completed && (
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-black text-white">
                    ✓ Done
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Complete Workout Button */}
      {completedCount === totalCount && (
        <div className="mt-6 bg-green-50 border-2 border-green-500 rounded-xl p-6 text-center">
          <h3 className="text-2xl font-bold text-green-800 mb-2">🎉 Workout Complete!</h3>
          <p className="text-green-700 mb-4">Great job! You&apos;ve finished all exercises for today.</p>
          <button className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200">
            Log Workout
          </button>
        </div>
      )}
    </div>
  );
}
