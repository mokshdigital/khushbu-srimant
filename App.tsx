import React, { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { GameMenu } from './components/GameMenu';
import { MemoryGame } from './components/games/MemoryGame';
import { WhoSaidIt } from './components/games/WhoSaidIt';
import { Predictions } from './components/games/Predictions';
import { CravingsQuiz } from './components/games/CravingsQuiz';
import { WordScramble } from './components/games/WordScramble';
import { NameSuggestions } from './components/games/NameSuggestions';
import { GameId, UserProfile } from './types';
import { saveUserLocally, getUserLocally } from './services/database';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeGame, setActiveGame] = useState<GameId | null>(null);

  // Load existing user session on mount
  useEffect(() => {
    const saved = getUserLocally();
    if (saved) setUser(saved);
  }, []);

  // Save user whenever it changes
  useEffect(() => {
    if (user) saveUserLocally(user);
  }, [user]);

  const handleStart = (name: string) => {
    const newUser: UserProfile = {
      id: Date.now().toString(), // Simple ID generation
      name,
      score: 0,
      completedGames: []
    };
    setUser(newUser);
  };

  const handleGameComplete = (score: number, data?: any) => {
    if (!user || !activeGame) return;

    setUser(prev => {
      if (!prev) return null;
      const updated = {
        ...prev,
        score: prev.score + score,
        completedGames: [...prev.completedGames, activeGame],
        // If the game passes back extra data (like prediction details), save it
        predictions: activeGame === GameId.PREDICTIONS && data ? data : prev.predictions,
        nameSuggestions: activeGame === GameId.NAME_SUGGESTIONS && data ? data : prev.nameSuggestions
      };
      return updated;
    });

    setActiveGame(null);
  };

  const handleStartOver = () => {
    setUser(null);
    setActiveGame(null);
  };

  const renderContent = () => {
    if (!user) return <WelcomeScreen onStart={handleStart} />;

    if (!activeGame) return <GameMenu user={user} onSelectGame={setActiveGame} onStartOver={handleStartOver} />;

    switch (activeGame) {
      case GameId.MEMORY:
        return <MemoryGame onComplete={handleGameComplete} onBack={() => setActiveGame(null)} />;
      case GameId.WHO_SAID_IT:
        return <WhoSaidIt onComplete={handleGameComplete} onBack={() => setActiveGame(null)} />;
      case GameId.PREDICTIONS:
        return <Predictions onComplete={handleGameComplete} onBack={() => setActiveGame(null)} />;
      case GameId.CRAVINGS:
        return <CravingsQuiz onComplete={handleGameComplete} onBack={() => setActiveGame(null)} />;
      case GameId.SCRAMBLE:
        return <WordScramble onComplete={handleGameComplete} onBack={() => setActiveGame(null)} />;
      case GameId.NAME_SUGGESTIONS:
        return <NameSuggestions onComplete={handleGameComplete} onBack={() => setActiveGame(null)} />;
      default:
        return <GameMenu user={user} onSelectGame={setActiveGame} onStartOver={handleStartOver} />;
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-purple-50/30">
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative flex flex-col">
        {/* Festive Header Decoration */}
        <div className="h-2 bg-gradient-to-r from-purple-400 via-indigo-500 to-teal-500"></div>

        <main className="flex-1 p-6 relative overflow-hidden">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;