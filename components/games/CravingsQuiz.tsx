import React, { useState } from 'react';
import { CRAVING_QUESTIONS } from '../../constants';
import { Button } from '../ui/Button';
import { Pizza, CheckCircle, XCircle } from 'lucide-react';

interface Props {
  onComplete: (score: number) => void;
  onBack: () => void;
}

export const CravingsQuiz: React.FC<Props> = ({ onComplete, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleOptionSelect = (option: string) => {
    if (selectedOption) return; // Prevent changing answer

    setSelectedOption(option);
    const correct = option === CRAVING_QUESTIONS[currentIndex].answer;
    setIsCorrect(correct);

    if (correct) {
      setScore(prev => prev + 1);
    }

    // Auto advance after 1.5 seconds
    setTimeout(() => {
      if (currentIndex < CRAVING_QUESTIONS.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setFinished(true);
      }
    }, 1500);
  };

  const finishGame = () => {
    onComplete(score);
  };

  if (finished) {
    return (
      <div className="flex flex-col h-full justify-center items-center text-center space-y-6 animate-fadeIn">
        <div className="bg-orange-100 p-6 rounded-full">
          <Pizza className="w-16 h-16 text-orange-600" />
        </div>
        <h2 className="text-3xl font-festive text-orange-600">Yummy!</h2>
        <div className="text-xl">
          You scored <span className="font-bold text-orange-600">{score}</span> out of {CRAVING_QUESTIONS.length}
        </div>
        <p className="text-gray-500">
          {score === CRAVING_QUESTIONS.length ? "You know her cravings perfectly!" : "She's got some weird cravings, huh?"}
        </p>
        <Button fullWidth onClick={finishGame}>Collect Points</Button>
      </div>
    );
  }

  const currentQuestion = CRAVING_QUESTIONS[currentIndex];

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-orange-600">Craving {currentIndex + 1}/{CRAVING_QUESTIONS.length}</h2>
        <button onClick={onBack} className="text-gray-400">Exit</button>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-orange-100 mb-4 flex items-center justify-center text-center">
          <p className="text-lg font-medium text-gray-800">{currentQuestion.question}</p>
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            let buttonStyle = "bg-white border-2 border-gray-100 text-gray-700 hover:border-orange-200";

            // Logic for showing correct/incorrect colors after selection
            if (selectedOption) {
              if (option === currentQuestion.answer) {
                buttonStyle = "bg-green-100 border-green-500 text-green-800";
              } else if (option === selectedOption) {
                buttonStyle = "bg-red-100 border-red-500 text-red-800";
              } else {
                buttonStyle = "opacity-50 bg-gray-50 border-gray-100";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionSelect(option)}
                disabled={!!selectedOption}
                className={`w-full p-4 rounded-xl font-semibold transition-all duration-200 flex justify-between items-center ${buttonStyle}`}
              >
                <span>{option}</span>
                {selectedOption && option === currentQuestion.answer && <CheckCircle size={20} className="text-green-600" />}
                {selectedOption === option && option !== currentQuestion.answer && <XCircle size={20} className="text-red-600" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};