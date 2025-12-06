import React, { useState } from 'react';
import { GARBA_SONGS } from '../../constants';
import { Button } from '../ui/Button';
import { Music, PlayCircle, PauseCircle } from 'lucide-react';

interface Props {
  onComplete: (score: number) => void;
  onBack: () => void;
}

export const GarbaQuiz: React.FC<Props> = ({ onComplete, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // Mock audio player logic
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In a real app, this would trigger an Audio object
  };

  const handleNext = () => {
    const isCorrect = selectedOption === GARBA_SONGS[currentIndex].answer;
    const newScore = isCorrect ? score + 1 : score;
    
    if (currentIndex < GARBA_SONGS.length - 1) {
      setScore(newScore);
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsPlaying(false);
    } else {
      onComplete(newScore);
    }
  };

  const currentSong = GARBA_SONGS[currentIndex];

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-purple-600">Garba Tune {currentIndex + 1}/{GARBA_SONGS.length}</h2>
        <button onClick={onBack} className="text-gray-400">Exit</button>
      </div>

      <div className="flex-1 flex flex-col items-center space-y-6">
        {/* Mock Audio Player Visualization */}
        <div className="w-full bg-purple-900 rounded-2xl p-8 flex flex-col items-center justify-center text-white shadow-xl relative overflow-hidden">
           <div className={`absolute inset-0 bg-purple-600 opacity-20 ${isPlaying ? 'animate-pulse' : ''}`}></div>
           <Music size={64} className={`mb-4 ${isPlaying ? 'animate-bounce' : ''}`} />
           <div className="w-full h-2 bg-purple-700 rounded-full mt-4 overflow-hidden">
             <div className={`h-full bg-green-400 ${isPlaying ? 'w-full transition-all duration-[5000ms] ease-linear' : 'w-0'}`}></div>
           </div>
           <p className="mt-4 text-sm text-purple-200">
             {isPlaying ? "Playing snippet..." : "Tap play to listen (imagine!)"}
           </p>
           <button 
            onClick={togglePlay}
            className="mt-4 p-3 rounded-full bg-white text-purple-900 hover:scale-110 transition-transform"
           >
             {isPlaying ? <PauseCircle size={40} /> : <PlayCircle size={40} />}
           </button>
        </div>

        {/* Hint Box */}
        <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-sm text-yellow-800 w-full text-center">
          <span className="font-bold">Hint:</span> {currentSong.hint}
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-3 w-full">
          {currentSong.options.map((option) => (
            <button
              key={option}
              onClick={() => setSelectedOption(option)}
              className={`p-4 rounded-xl border-2 font-medium transition-all text-left flex justify-between items-center
                ${selectedOption === option 
                  ? 'bg-purple-100 border-purple-500 text-purple-900' 
                  : 'bg-white border-gray-100 text-gray-600 hover:border-purple-200'}`}
            >
              {option}
              {selectedOption === option && <span className="text-purple-500">●</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <Button fullWidth onClick={handleNext} disabled={!selectedOption}>
          {currentIndex === GARBA_SONGS.length - 1 ? 'Finish Game' : 'Next Song'}
        </Button>
      </div>
    </div>
  );
};
