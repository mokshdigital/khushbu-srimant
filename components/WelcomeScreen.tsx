import React, { useState } from 'react';
import { Button } from './ui/Button';
import { FileText } from 'lucide-react';

interface Props {
  onStart: (name: string) => void;
  onSummary: () => void;
}

export const WelcomeScreen: React.FC<Props> = ({ onStart, onSummary }) => {
  const [name, setName] = useState('');

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-6 animate-fadeIn">
      {/* Om Symbol */}
      <div className="text-7xl mb-2" style={{ color: '#ea580c' }}>
        🕉️
      </div>

      {/* Ganesha Greeting */}
      <div className="text-lg font-semibold text-gray-700" style={{ fontFamily: 'serif' }}>
        श्री गणेशाय नमः
      </div>
      <p className="text-sm text-gray-500 -mt-2">Shri Ganeshay Namah</p>

      {/* Cover Image */}
      <div className="my-4">
        <img
          src="/images/cover.jpeg"
          alt="Srimant Ceremony"
          className="w-48 h-48 rounded-full object-cover shadow-2xl border-4 border-purple-200"
        />
      </div>

      {/* Title */}
      <div>
        <h1 className="text-4xl font-festive text-purple-600 mb-2">Srimant Ceremony</h1>
        <h2 className="text-xl font-bold text-gray-700">Celebration Games</h2>
        <p className="text-gray-600 mt-2 font-medium">Khushbu & Aakash</p>
      </div>

      {/* Event Date */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-full border-2 border-purple-200">
        <p className="text-purple-700 font-bold">📅 December 06, 2025</p>
      </div>

      {/* Name Input - Hidden */}
      {/* <div className="w-full max-w-xs">
        <label className="block text-left text-sm font-semibold text-gray-600 mb-2">Your Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name..."
          className="w-full p-4 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none shadow-sm text-lg text-center"
        />
      </div> */}

      {/* Let's Play Button - Hidden */}
      {/* <Button
        fullWidth
        disabled={!name.trim()}
        onClick={() => onStart(name)}
      >
        Let's Play! 🎮
      </Button> */}

      {/* Summary Form Button */}
      <button
        onClick={onSummary}
        className="w-full max-w-xs flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border-2 border-purple-300 text-purple-700 font-semibold hover:bg-purple-50 transition-colors"
      >
        <FileText size={20} />
        <span>Fill Summary Form</span>
      </button>

      <div className="mt-4 text-sm text-gray-400">
        Scan • Play • Win • Celebrate 🎉
      </div>
    </div>
  );
};
