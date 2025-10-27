'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

// Programmed responses for demo
const programmedResponses: { [key: string]: string } = {
  'hello': 'Hello! I\'m your AI fitness trainer. I\'m here to help you achieve your fitness goals. What would you like to know?',
  'hi': 'Hi there! Ready to crush your fitness goals? How can I assist you today?',
  'workout': 'I can help you create a personalized workout plan! Based on your goals, I recommend:\n\n1. **Strength Training** (3x/week): Focus on compound movements like squats, deadlifts, and bench press\n2. **Cardio** (2x/week): 30 minutes of moderate intensity\n3. **Rest Days**: Essential for recovery\n\nWhat\'s your primary fitness goal?',
  'diet': 'Nutrition is 70% of your results! Here\'s my advice:\n\n🥗 **Macros for muscle gain:**\n- Protein: 1.6-2.2g per kg bodyweight\n- Carbs: 4-6g per kg bodyweight\n- Fats: 0.8-1g per kg bodyweight\n\n💧 Stay hydrated: 3-4 liters of water daily\n\nWould you like a sample meal plan?',
  'meal plan': 'Here\'s a sample daily meal plan:\n\n**Breakfast** (7 AM)\n- 3 eggs, 2 slices whole wheat toast, avocado\n- Coffee or green tea\n\n**Snack** (10 AM)\n- Greek yogurt with berries and almonds\n\n**Lunch** (1 PM)\n- Grilled chicken breast, quinoa, steamed vegetables\n\n**Pre-Workout** (4 PM)\n- Banana with peanut butter\n\n**Post-Workout** (6 PM)\n- Protein shake with oats\n\n**Dinner** (8 PM)\n- Salmon, sweet potato, green salad\n\nTotal: ~2,400 calories, 180g protein',
  'muscle': 'To build muscle effectively:\n\n💪 **Key Principles:**\n1. Progressive overload - increase weight/reps weekly\n2. Train each muscle group 2x per week\n3. 8-12 reps for hypertrophy\n4. Rest 48 hours between same muscle groups\n5. Eat in a caloric surplus (+300-500 calories)\n\n**Recommended split:**\n- Monday: Chest & Triceps\n- Tuesday: Back & Biceps\n- Wednesday: Rest\n- Thursday: Legs\n- Friday: Shoulders & Core\n- Weekend: Rest or light cardio',
  'cardio': 'Cardio is great for heart health and fat loss!\n\n🏃 **Types of Cardio:**\n\n**LISS (Low Intensity):**\n- 30-45 min walking/cycling\n- Burns fat, easy recovery\n- Do on rest days\n\n**HIIT (High Intensity):**\n- 20 min sprint intervals\n- Burns more calories\n- 2-3x per week max\n\n**Recommendation:** Mix both! Start with 2-3 sessions weekly. What\'s your current fitness level?',
  'beginner': 'Welcome to your fitness journey! Here\'s a beginner-friendly plan:\n\n**Week 1-4: Foundation Phase**\n\n**3x per week (Mon/Wed/Fri):**\n- Squats: 3 sets x 10 reps\n- Push-ups: 3 sets x 8-10 reps\n- Dumbbell rows: 3 sets x 10 reps\n- Plank: 3 sets x 30 seconds\n- Walking: 20 minutes\n\n💡 **Tips:**\n- Focus on form over weight\n- Rest 60-90 seconds between sets\n- Stretch after each session\n- Stay consistent!\n\nHow does this sound?',
  'advanced': 'Great! For advanced training, let\'s push your limits:\n\n**Advanced Training Techniques:**\n\n1. **Periodization:** Vary intensity (strength/hypertrophy/power cycles)\n2. **Drop sets:** Reduce weight, continue to failure\n3. **Supersets:** Back-to-back exercises, no rest\n4. **Tempo training:** Control eccentric/concentric phases\n5. **Deload weeks:** Every 4-6 weeks reduce volume 40-50%\n\n**Sample Upper Body (Advanced):**\n- Bench Press: 5x5 (heavy)\n- Incline DB Press: 4x8-10\n- Weighted Pull-ups: 4x6-8\n- DB Rows: 4x10 (drop set on last)\n- Face Pulls: 3x15-20\n\nWhat specific goal are you targeting?',
  'lose weight': 'Let\'s create a sustainable fat loss plan!\n\n🔥 **Fat Loss Strategy:**\n\n**Nutrition:**\n- Caloric deficit: -500 calories/day\n- High protein: 2g per kg bodyweight\n- 4-5 smaller meals throughout the day\n\n**Training:**\n- Resistance training: 4x/week (preserve muscle)\n- Cardio: 3x/week (LISS + 1 HIIT)\n- Daily steps: 10,000+\n\n**Expected Results:**\n- Safe rate: 0.5-1kg per week\n- Focus on body composition, not just scale weight\n\n📊 Track everything: food, workouts, progress photos!\n\nShall I provide a detailed workout split?',
  'rest': 'Rest and recovery are CRUCIAL for progress!\n\n😴 **Recovery Tips:**\n\n**Sleep:**\n- 7-9 hours nightly\n- Same sleep schedule\n- Cool, dark room\n\n**Active Recovery:**\n- Light walking\n- Yoga or stretching\n- Swimming\n\n**Nutrition:**\n- Adequate protein (muscle repair)\n- Hydration\n- Anti-inflammatory foods\n\n**Rest Day Activities:**\n- Foam rolling\n- Massage\n- Sauna/ice bath (if available)\n\n⚠️ **Signs you need more rest:**\n- Persistent fatigue\n- Decreased performance\n- Irritability\n- Poor sleep quality\n\nRemember: Muscles grow during rest, not during workouts!',
  'motivation': '💪 You\'ve got this! Here\'s your motivation boost:\n\n✨ **Remember:**\n- Every workout counts, even the short ones\n- Progress isn\'t linear - trust the process\n- You\'re stronger than yesterday\n- Consistency beats perfection\n- Your future self will thank you\n\n🎯 **Set small wins:**\n- Show up today\n- One more rep than last time\n- Try one healthy meal\n- Drink enough water\n\n"The only bad workout is the one that didn\'t happen."\n\nWhat\'s holding you back? Let\'s tackle it together!',
  'injury': '⚠️ **Important:** For specific injuries, please consult a healthcare professional.\n\n**General Injury Prevention:**\n\n1. **Warm-up properly** (10 minutes)\n2. **Use correct form** always\n3. **Don\'t ego lift** - leave ego at door\n4. **Progressive overload** - gradual increases\n5. **Listen to your body** - pain ≠ gain\n\n**Common Issues:**\n\n**Lower Back Pain:**\n- Strengthen core\n- Improve hip mobility\n- Check squat/deadlift form\n\n**Shoulder Pain:**\n- Face pulls daily\n- Reduce overhead pressing volume\n- Improve posture\n\n**Knee Pain:**\n- Strengthen glutes/VMO\n- Work on ankle mobility\n- Check squat depth\n\n🏥 If pain persists > 1 week, see a professional!',
  'supplements': 'Here\'s the truth about supplements:\n\n✅ **Worth It:**\n\n1. **Protein Powder** - Convenient protein source\n   - 1-2 scoops daily if needed\n\n2. **Creatine Monohydrate** - Most researched\n   - 5g daily, proven to work\n\n3. **Vitamin D3** - Especially if limited sun exposure\n   - 2000-4000 IU daily\n\n4. **Omega-3** - If low fish intake\n   - 1-2g EPA/DHA daily\n\n❌ **Save Your Money:**\n- Fat burners\n- BCAAs (if eating enough protein)\n- Most pre-workouts (just caffeine works)\n- Testosterone boosters\n\n💡 **Remember:** Supplements are 5% of results. Focus on:\n1. Proper training\n2. Good nutrition\n3. Adequate sleep\n4. Consistency\n\nGet the basics right first!',
  'routine': 'Let me suggest a complete workout routine!\n\n🏋️ **4-Day Upper/Lower Split:**\n\n**Monday - Upper Body:**\n- Bench Press: 4x8\n- Barbell Rows: 4x8\n- Overhead Press: 3x10\n- Lat Pulldowns: 3x10\n- Dumbbell Curls: 3x12\n- Tricep Dips: 3x12\n\n**Tuesday - Lower Body:**\n- Squats: 4x8\n- Romanian Deadlifts: 3x10\n- Leg Press: 3x12\n- Leg Curls: 3x12\n- Calf Raises: 4x15\n- Abs: 3x15\n\n**Wednesday - Rest/Cardio**\n\n**Thursday - Upper Body:**\n- Incline Dumbbell Press: 4x8\n- Pull-ups: 4x8\n- Dumbbell Shoulder Press: 3x10\n- Cable Rows: 3x10\n- Hammer Curls: 3x12\n- Overhead Tricep Extension: 3x12\n\n**Friday - Lower Body:**\n- Deadlifts: 4x6\n- Front Squats: 3x10\n- Walking Lunges: 3x12\n- Leg Extensions: 3x12\n- Seated Calf Raises: 4x15\n- Planks: 3x45sec\n\n**Weekend - Rest**\n\nReady to start?',
  'thanks': 'You\'re welcome! Remember, I\'m here whenever you need guidance. Keep pushing forward! 💪',
  'thank you': 'My pleasure! Your commitment to fitness is inspiring. Let\'s keep working towards your goals! 🌟',
  'bye': 'Goodbye! Keep training hard and stay consistent. Come back anytime you need advice! 💪🏆',
};

export default function AITrainerChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI personal trainer. I can help you with:\n\n• Workout routines\n• Diet & nutrition advice\n• Form corrections\n• Motivation & tips\n• Injury prevention\n• Supplement guidance\n\nWhat would you like to know today?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for exact matches first
    for (const [key, response] of Object.entries(programmedResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }

    // Default responses for unmatched queries
    const defaultResponses = [
      'That\'s a great question! While I have specific knowledge about workouts, diet, supplements, and training tips, I\'d recommend being more specific. Try asking about:\n\n• "workout" or "routine"\n• "diet" or "meal plan"\n• "muscle building"\n• "lose weight"\n• "cardio"\n• "supplements"\n• "beginner" or "advanced"\n\nWhat topic interests you most?',
      'I want to help you with that! I specialize in fitness topics like:\n\n💪 Workout planning\n🥗 Nutrition and diet\n🏃 Cardio training\n💊 Supplements\n🎯 Goal setting\n\nCould you rephrase your question focusing on one of these areas?',
      'Great question! To give you the best advice, could you be more specific? For example:\n\n• "What workout is best for beginners?"\n• "How should I eat to build muscle?"\n• "What supplements do I need?"\n• "How do I lose weight?"\n\nI\'m here to help! 💪',
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: getAIResponse(inputValue),
      sender: 'ai',
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages(prev => [...prev, aiResponse]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    'Create me a workout routine',
    'What should I eat to build muscle?',
    'How do I lose weight?',
    'Beginner workout plan',
    'Tell me about supplements',
  ];

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-220px)] bg-white rounded-xl shadow-lg border border-gray-200">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-5 py-3 ${
                message.sender === 'user'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {message.sender === 'ai' && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">🤖</span>
                  </div>
                  <span className="text-xs font-semibold text-gray-600">AI Trainer</span>
                </div>
              )}
              <p className="whitespace-pre-line text-sm leading-relaxed">{message.text}</p>
              <span className={`text-xs mt-2 block ${
                message.sender === 'user' ? 'text-gray-300' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl px-5 py-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">🤖</span>
                </div>
                <span className="text-xs font-semibold text-gray-600">AI Trainer</span>
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
        <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
        <div className="flex gap-2 flex-wrap">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(question)}
              className="text-xs px-3 py-1.5 bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
        <div className="flex gap-3">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about fitness, workouts, or nutrition..."
            className="flex-1 resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          💡 Tip: Press Enter to send, Shift + Enter for new line
        </p>
      </div>
    </div>
  );
}
