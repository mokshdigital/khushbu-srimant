import React, { useState, useEffect } from 'react';
import { SCRAMBLE_WORDS } from '../../constants';
import { Button } from '../ui/Button';
import { Puzzle, HelpCircle, CheckCircle, XCircle } from 'lucide-react';
import { generateImage } from '../../services/imageService';

interface Props {
  onComplete: (score: number) => void;
  onBack: () => void;
}

interface WordResult {
  word: string;
  userAnswer: string;
  correct: boolean;
  imageUrl?: string;
}

export const WordScramble: React.FC<Props> = ({ onComplete, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [finished, setFinished] = useState(false);
  const [results, setResults] = useState<WordResult[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);

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
      setScore(prev => prev + 1);
      setResults(prev => [...prev, {
        word: currentWord.answer,
        userAnswer: userInput.trim().toUpperCase(),
        correct: true
      }]);

      setTimeout(() => {
        nextWord();
      }, 1000);
    } else {
      setFeedback('wrong');
      setResults(prev => [...prev, {
        word: currentWord.answer,
        userAnswer: userInput.trim().toUpperCase(),
        correct: false
      }]);

      setTimeout(() => {
        nextWord();
      }, 1500);
    }
  };

  const nextWord = () => {
    setFeedback(null);
    setUserInput('');
    setShowHint(false);

    if (currentIndex < SCRAMBLE_WORDS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      finishGame();
    }
  };

  const finishGame = async () => {
    setFinished(true);
    setLoadingImages(true);

    // Generate images for all words
    const updatedResults = await Promise.all(
      results.map(async (result) => {
        try {
          const imageUrl = await generateImage(result.word);
          return { ...result, imageUrl };
        } catch (error) {
          console.error(`Failed to generate image for ${result.word}:`, error);
          return result;
        }
      })
    );

    setResults(updatedResults);
    setLoadingImages(false);
  };

  const getScoreMessage = (score: number, total: number) => {
    const percentage = (score / total) * 100;

    if (percentage === 100) return "🎉 Perfect! You're a word master!";
    if (percentage >= 80) return "🌟 Excellent work! Almost perfect!";
    if (percentage >= 60) return "👍 Great job! You did well!";
    if (percentage >= 40) return "😊 Not bad! Keep practicing!";
    if (percentage >= 20) return "💪 Good effort! Try again!";
    return "😅 That was tricky! Better luck next time!";
  };

  if (finished) {
    return (
      <div className="flex flex-col h-full overflow-y-auto pb-24">
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white z-10 pb-2">
          <h2 className="text-xl font-bold text-green-600">Results</h2>
          <button onClick={onBack} className="text-gray-400">Exit</button>
        </div>

        <div className="flex flex-col items-center text-center space-y-4 mb-6">
          <div className="bg-green-100 p-6 rounded-full">
            <Puzzle className="w-12 h-12 text-green-600" />
          </div>
          <div className="text-xl">
            You scored <span className="font-bold text-green-600">{score}</span> out of {SCRAMBLE_WORDS.length}
          </div>
          <p className="text-lg font-medium text-gray-700">{getScoreMessage(score, SCRAMBLE_WORDS.length)}</p>
        </div>

        <div className="space-y-3 mb-6">
          <h3 className="font-bold text-gray-800 text-lg">All Words:</h3>
          {loadingImages && (
            <p className="text-sm text-gray-500 text-center">Loading images...</p>
          )}
          {results.map((result, idx) => (
            <div key={idx} className={`p-4 rounded-xl border-2 ${result.correct ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {result.correct ? (
                    <CheckCircle size={20} className="text-green-600" />
                  ) : (
                    <XCircle size={20} className="text-red-600" />
                  )}
                  <span className="font-bold text-gray-800">{result.word}</span>
                </div>
                {!result.correct && (
                  <span className="text-sm text-gray-500">Your answer: {result.userAnswer}</span>
                )}
              </div>
              {result.imageUrl && (
                <img
                  src={result.imageUrl}
                  alt={result.word}
                  className="w-full h-32 object-cover rounded-lg mt-2"
                />
              )}
            </div>
          ))}
        </div>

        {/* Sticky Button at Bottom */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent">
          <div className="max-w-md mx-auto">
            <Button fullWidth onClick={() => onComplete(score)}>Collect Points</Button>
          </div>
        </div>
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

        {/* Feedback Message */}
        {feedback && (
          <div className={`text-center animate-bounce ${feedback === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
            <p className="text-xl font-bold">
              {feedback === 'correct' ? '✅ Correct!' : '❌ Incorrect! Moving to next...'}
            </p>
            {feedback === 'wrong' && (
              <p className="text-sm mt-1">The answer was: {currentWord.answer}</p>
            )}
          </div>
        )}

        {/* Input Form */}
        {!feedback && (
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="relative">
              <input
                id="scramble-input"
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your answer..."
                autoComplete="off"
                className="w-full p-4 text-center text-xl font-bold rounded-xl border-2 border-green-200 focus:border-green-500 focus:outline-none transition-colors"
              />
            </div>

            <Button fullWidth type="submit" disabled={!userInput.trim()}>
              Submit
            </Button>
          </form>
        )}

        {/* Hint Section */}
        {!feedback && (
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
        )}

      </div>
    </div>
  );
};