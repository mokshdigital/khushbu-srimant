import React, { useState, useEffect } from 'react';
import { MEMORY_ITEMS } from '../../constants';
import { Button } from '../ui/Button';
import { scoreMemoryGame } from '../../services/geminiService';
import { Milk, Smile, Box, Bell, Shirt, ShoppingCart, ToyBrick, Footprints, Droplet, Loader2 } from 'lucide-react';

// Icon mapper
const IconMap: Record<string, React.ReactNode> = {
  Milk: <Milk size={32} />,
  Smile: <Smile size={32} />,
  Box: <Box size={32} />,
  Bell: <Bell size={32} />,
  Shirt: <Shirt size={32} />,
  ShoppingCart: <ShoppingCart size={32} />,
  ToyBrick: <ToyBrick size={32} />,
  Footprints: <Footprints size={32} />,
  Droplet: <Droplet size={32} />,
};

interface Props {
  onComplete: (score: number) => void;
  onBack: () => void;
}

export const MemoryGame: React.FC<Props> = ({ onComplete, onBack }) => {
  const [phase, setPhase] = useState<'intro' | 'memorize' | 'recall' | 'scoring' | 'result'>('intro');
  const [timeLeft, setTimeLeft] = useState(10);
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState<{ score: number; matches: string[] } | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (phase === 'memorize') {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setPhase('recall');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [phase]);

  const handleSubmit = async () => {
    setPhase('scoring');
    const targetNames = MEMORY_ITEMS.map(item => item.name);
    try {
      const scoreResult = await scoreMemoryGame(userInput, targetNames);
      setResult(scoreResult);
      setPhase('result');
      // Report score back to main app, but don't close game yet
    } catch (e) {
      console.error(e);
      setPhase('result'); // Should handle error better, but demo mode
    }
  };

  const finishGame = () => {
    if (result) onComplete(result.score);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-pink-600 font-festive">Guess the Items</h2>
        <button onClick={onBack} className="text-sm text-gray-500 underline">Quit</button>
      </div>

      {phase === 'intro' && (
        <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6">
          <div className="p-6 bg-white rounded-full shadow-xl">
             <BabyIcon className="text-pink-400 w-16 h-16" />
          </div>
          <p className="text-lg">You have <b>10 seconds</b> to memorize {MEMORY_ITEMS.length} baby items. Ready?</p>
          <Button fullWidth onClick={() => setPhase('memorize')}>Start Timer</Button>
        </div>
      )}

      {phase === 'memorize' && (
        <div className="flex-1 flex flex-col">
          <div className="text-center mb-4">
            <span className="text-3xl font-bold text-orange-500">{timeLeft}s</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {MEMORY_ITEMS.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center justify-center aspect-square animate-pulse">
                <div className="text-pink-500 mb-2">{IconMap[item.iconName]}</div>
                <span className="text-xs font-semibold text-center leading-tight">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {phase === 'recall' && (
        <div className="flex-1 flex flex-col space-y-4">
          <p className="text-center font-medium">Time's up! List as many items as you remember.</p>
          <textarea
            className="flex-1 w-full p-4 rounded-xl border-2 border-orange-200 focus:border-orange-500 focus:ring-0 resize-none shadow-inner bg-white"
            placeholder="e.g. bottle, diaper, rattle..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <Button fullWidth onClick={handleSubmit}>Submit Answers</Button>
        </div>
      )}

      {phase === 'scoring' && (
        <div className="flex-1 flex flex-col justify-center items-center text-center space-y-4">
          <Loader2 className="animate-spin text-orange-500 w-12 h-12" />
          <p className="text-gray-600">Checking your answers with AI...</p>
        </div>
      )}

      {phase === 'result' && result && (
        <div className="flex-1 flex flex-col space-y-4 animate-fadeIn">
          <div className="text-center bg-white p-6 rounded-xl shadow-lg border-2 border-pink-100">
            <h3 className="text-xl text-gray-500">You scored</h3>
            <div className="text-6xl font-bold text-pink-600 my-2">{result.score}</div>
            <p className="text-gray-400 text-sm">out of {MEMORY_ITEMS.length}</p>
          </div>
          
          <div className="flex-1 bg-white/50 rounded-xl p-4 overflow-y-auto">
            <h4 className="font-semibold mb-2">Matched Items:</h4>
            {result.matches.length > 0 ? (
              <ul className="list-disc list-inside space-y-1 text-green-700">
                {result.matches.map((m, i) => <li key={i}>{m}</li>)}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No matches found. Did you type anything?</p>
            )}
          </div>
          <Button fullWidth onClick={finishGame}>Continue</Button>
        </div>
      )}
    </div>
  );
};

const BabyIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.8 9 9 0 0 1-17.6 0A2 2 0 0 1 3.2 10.2"/><path d="m19 6.3-8.9 4.2"/></svg>
);