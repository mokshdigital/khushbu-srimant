import React, { useState, useEffect } from 'react';
import { SCRAMBLE_WORDS } from '../../constants';
import { Button } from '../ui/Button';
import { Puzzle, HelpCircle } from 'lucide-react';

interface Props {
  onComplete: (score: number) => void;
  onBack: () => void;
}

export const WordScramble: React.FC<Props> = ({ onComplete, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [finished, setFinished] = useState(false);

  // Auto-focus input when moving to next word
  useEffect(() => {
    const input = document.getElementById('scramble-input');
    if (input) input.focus();
  }, [currentIndex]);

  const currentWord = SCRAMBLE_WORDS[currentIndex];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const isCorrect = userInput.trim().toUpperCase() === currentWord.answer.toUpperCase();

    if (isCorrect) {
      setFeedback('correct');
      // Bonus point for not using hint? For now just 1 point per word.
      setScore(prev => prev + 1);
      
      setTimeout(() => {
        nextWord();
      }, 1000);
    } else {
      setFeedback('wrong');
      // Shake animation effect could be added here
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  const nextWord = () => {
    setFeedback(null);
    setUserInput('');
    setShowHint(false);
    
    if (currentIndex < SCRAMBLE_WORDS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setFinished(true);
    }
  };

  const handleSkip = () => {
    nextWord();
  };

  if (finished) {
    return (
      <div className="flex flex-col h-full justify-center items-center text-center space-y-6 animate-fadeIn">
        <div className="bg-green-100 p-6 rounded-full">
          <Puzzle className="w-16 h-16 text-green-600" />
        </div>
        <h2 className="text-3xl font-festive text-green-600">Great Job!</h2>
        <div className="text-xl">
          You unscrambled <span className="font-bold text-green-600">{score}</span> out of {SCRAMBLE_WORDS.length} words
        </div>
        <Button fullWidth onClick={() => onComplete(score)}>Done</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-green-600">Word {currentIndex + 1}/{SCRAMBLE_WORDS.length}</h2>
        <button onClick={onBack} className="text-gray-400">Exit</button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        
        {/* Scrambled Word Display */}
        <div className="text-center space-y-2">
          <p className="text-gray-500 text-sm uppercase tracking-widest">Unscramble this:</p>
          <div className="text-5xl font-black text-gray-800 tracking-wider font-mono bg-white px-8 py-4 rounded-xl shadow-sm border-2 border-dashed border-gray-200">
            {currentWord.scrambled}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="relative">
             <input
              id="scramble-input"
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your answer..."
              autoComplete="off"
              className={`w-full p-4 text-center text-xl font-bold rounded-xl border-2 focus:outline-none transition-colors
                ${feedback === 'correct' ? 'border-green-500 bg-green-50 text-green-700' : 
                  feedback === 'wrong' ? 'border-red-500 bg-red-50 text-red-700' : 
                  'border-green-200 focus:border-green-500'}
              `}
            />
          </div>

          <Button fullWidth type="submit" disabled={!userInput.trim() || feedback === 'correct'}>
            {feedback === 'correct' ? 'Correct!' : 'Submit'}
          </Button>
        </form>

        {/* Hint Section */}
        <div className="w-full">
          {!showHint ? (
            <button 
              onClick={() => setShowHint(true)}
              className="text-sm text-gray-500 flex items-center justify-center mx-auto hover:text-green-600 transition-colors"
            >
              <HelpCircle size={16} className="mr-1" /> Need a hint?
            </button>
          ) : (
            <div className="bg-yellow-50 text-yellow-800 p-3 rounded-lg text-sm text-center animate-fadeIn border border-yellow-200">
              💡 {currentWord.hint}
            </div>
          )}
        </div>

      </div>

      <div className="mt-auto pt-6">
        <button onClick={handleSkip} className="w-full text-gray-400 text-sm py-2 hover:text-gray-600">
          Skip this word
        </button>
      </div>
    </div>
  );
};