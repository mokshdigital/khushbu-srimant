import React, { useState } from 'react';
import { WHO_SAID_IT_QUESTIONS } from '../../constants';
import { Button } from '../ui/Button';
import { User, Heart } from 'lucide-react';

interface Props {
  onComplete: (score: number) => void;
  onBack: () => void;
}

export const WhoSaidIt: React.FC<Props> = ({ onComplete, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (answer: 'Mom' | 'Dad') => {
    const isCorrect = answer === WHO_SAID_IT_QUESTIONS[currentIndex].answer;
    if (isCorrect) setScore(s => s + 1);
    
    setShowFeedback(isCorrect ? 'correct' : 'wrong');

    setTimeout(() => {
      setShowFeedback(null);
      if (currentIndex < WHO_SAID_IT_QUESTIONS.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setFinished(true);
      }
    }, 1200);
  };

  if (finished) {
    return (
      <div className="flex flex-col h-full justify-center items-center text-center space-y-6">
        <h2 className="text-3xl font-festive text-blue-600">All Done!</h2>
        <div className="bg-white p-8 rounded-full shadow-xl w-48 h-48 flex flex-col justify-center items-center border-4 border-blue-100">
           <span className="text-5xl font-bold text-blue-600">{score}</span>
           <span className="text-gray-500">out of {WHO_SAID_IT_QUESTIONS.length}</span>
        </div>
        <p className="text-lg text-gray-700">
          {score === WHO_SAID_IT_QUESTIONS.length ? "You know them perfectly!" : "Not bad!"}
        </p>
        <Button fullWidth onClick={() => onComplete(score)}>Finish</Button>
      </div>
    );
  }

  const question = WHO_SAID_IT_QUESTIONS[currentIndex];

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-blue-600">Question {currentIndex + 1}/{WHO_SAID_IT_QUESTIONS.length}</h2>
        <button onClick={onBack} className="text-gray-400">Exit</button>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {showFeedback ? (
          <div className={`flex flex-col items-center justify-center p-8 rounded-2xl animate-bounce ${showFeedback === 'correct' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            <span className="text-6xl mb-4">{showFeedback === 'correct' ? '✅' : '❌'}</span>
            <span className="text-2xl font-bold">{showFeedback === 'correct' ? 'Correct!' : 'Oops!'}</span>
            <p className="mt-2">It was {question.answer}!</p>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-blue-100 mb-8 min-h-[200px] flex items-center justify-center text-center">
             <p className="text-xl font-medium text-gray-800">"{question.text}"</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-auto">
        <button 
          onClick={() => handleAnswer('Mom')}
          disabled={!!showFeedback}
          className="bg-pink-100 hover:bg-pink-200 text-pink-700 p-6 rounded-xl flex flex-col items-center transition-all border-2 border-pink-200"
        >
          <Heart className="w-8 h-8 mb-2 fill-current" />
          <span className="font-bold">Mom (Khushbu)</span>
        </button>
        <button 
          onClick={() => handleAnswer('Dad')}
          disabled={!!showFeedback}
          className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-6 rounded-xl flex flex-col items-center transition-all border-2 border-blue-200"
        >
          <User className="w-8 h-8 mb-2 fill-current" />
          <span className="font-bold">Dad (Aakash)</span>
        </button>
      </div>
    </div>
  );
};
