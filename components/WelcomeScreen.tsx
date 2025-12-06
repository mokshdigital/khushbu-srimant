import React, { useState } from 'react';
import { Button } from './ui/Button';

interface Props {
  onStart: (name: string) => void;
}

export const WelcomeScreen: React.FC<Props> = ({ onStart }) => {
  const [name, setName] = useState('');

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-5xl font-festive text-orange-600 mb-2">Srimant</h1>
        <h2 className="text-2xl font-bold text-gray-700">Ceremony Games</h2>
        <p className="text-gray-500 mt-2">Khushbu & Aakash</p>
      </div>

      <div className="w-full max-w-xs">
        <label className="block text-left text-sm font-semibold text-gray-600 mb-2">Your Name</label>
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name..."
          className="w-full p-4 rounded-xl border-2 border-orange-200 focus:border-orange-500 focus:outline-none shadow-sm text-lg text-center"
        />
      </div>

      <Button 
        fullWidth 
        disabled={!name.trim()} 
        onClick={() => onStart(name)}
      >
        Let's Play!
      </Button>

      <div className="mt-8 text-sm text-gray-400">
        scan to play • win prizes • have fun
      </div>
    </div>
  );
};
