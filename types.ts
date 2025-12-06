import React from 'react';

export enum GameId {
  MEMORY = 'memory',
  WHO_SAID_IT = 'who-said-it',
  PREDICTIONS = 'predictions',
  CRAVINGS = 'cravings',
  SCRAMBLE = 'scramble',
  NAME_SUGGESTIONS = 'name-suggestions',
}

export interface UserProfile {
  id: string;
  name: string;
  score: number;
  completedGames: GameId[];
  predictions?: Record<string, any>;
  nameSuggestions?: {
    letter: string;
    boyName: string;
    girlName: string;
  };
}

export interface GameConfig {
  id: GameId;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export interface MemoryItem {
  id: string;
  name: string;
  iconName: string; // Lucide icon name mapping
}

export interface Question {
  id: number;
  text: string;
  answer: 'Mom' | 'Dad';
}

export interface ScrambleWord {
  id: number;
  scrambled: string;
  answer: string;
  hint: string;
}

export interface CravingQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

export interface GarbaSong {
  id: number;
  hint: string;
  options: string[];
  answer: string;
}