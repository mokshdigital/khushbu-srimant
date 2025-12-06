import React, { useState } from 'react';
import { GAMES } from '../constants';
import { GameId, UserProfile } from '../types';
import { Trophy, CheckCircle2, Send, Loader2, CheckCircle, RotateCcw } from 'lucide-react';
import { submitScores } from '../services/emailService';
import { clearUserSession } from '../services/database';

interface Props {
  user: UserProfile;
  onSelectGame: (id: GameId) => void;
  onStartOver: () => void;
}

export const GameMenu: React.FC<Props> = ({ user, onSelectGame, onStartOver }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const hasCompletedGames = user.completedGames.length > 0;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setShowError(false);

    const result = await submitScores(user);

    setIsSubmitting(false);

    if (result.success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const handleStartOver = () => {
    if (confirm('Are you sure you want to start over? This will clear all your progress.')) {
      clearUserSession();
      onStartOver();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Hello, {user.name}!</h1>
          <p className="text-gray-500 text-sm">Ready to win?</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="bg-purple-100 px-4 py-2 rounded-full flex items-center space-x-2 text-purple-700 font-bold border border-purple-200">
            <Trophy size={18} />
            <span>{user.score} pts</span>
          </div>
          <button
            onClick={handleStartOver}
            className="text-xs text-gray-400 hover:text-purple-500 flex items-center gap-1 transition-colors"
          >
            <RotateCcw size={12} />
            <span>Start Over</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 pb-24 overflow-y-auto">
        {GAMES.map((game, index) => {
          const isCompleted = user.completedGames.includes(game.id);
          const isLocked = index > 0 && !user.completedGames.includes(GAMES[index - 1].id);

          // Don't show locked games at all
          if (isLocked) return null;

          return (
            <button
              key={game.id}
              onClick={() => !isCompleted && onSelectGame(game.id)}
              disabled={isCompleted}
              className={`relative p-4 rounded-2xl text-left transition-all duration-200 shadow-sm border border-transparent
                ${isCompleted ? 'bg-gray-100 opacity-70 cursor-default' : 'bg-white hover:shadow-md hover:scale-[1.02] active:scale-95 animate-fadeIn'}
              `}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${game.color}`}>
                {game.icon}
              </div>
              <h3 className="font-bold text-gray-800 leading-tight mb-1">{game.title}</h3>
              <p className="text-xs text-gray-500 leading-snug">{game.description}</p>

              {isCompleted && (
                <div className="absolute top-2 right-2 text-green-500">
                  <CheckCircle2 size={20} fill="white" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Submit Scores Button - Sticky at bottom */}
      {hasCompletedGames && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent">
          <div className="max-w-md mx-auto">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : showSuccess ? (
                <>
                  <CheckCircle size={20} />
                  <span>Submitted! ✓</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>Submit My Scores</span>
                </>
              )}
            </button>
            {showError && (
              <p className="text-red-500 text-sm text-center mt-2">
                Failed to submit. Please try again.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
