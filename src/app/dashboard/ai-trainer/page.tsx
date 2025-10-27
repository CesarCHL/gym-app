'use client';

import AITrainerChat from '@/components/AITrainerChat';

export default function AITrainerPage() {
  return (
    <div className="p-8 h-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-black mb-2">AI Trainer</h1>
        <p className="text-gray-600">Get personalized fitness advice and workout recommendations</p>
      </div>

      {/* AI Trainer Chat Component */}
      <AITrainerChat />
    </div>
  );
}
