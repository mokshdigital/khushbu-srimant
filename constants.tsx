import React from 'react';
import { GameId, GameConfig, MemoryItem, Question, ScrambleWord, CravingQuestion, GarbaSong } from './types';
import { Baby, MessageCircle, Star, Pizza, Puzzle, Sparkles } from 'lucide-react';

export const GAMES: GameConfig[] = [
  {
    id: GameId.MEMORY,
    title: "Baby Memory Match",
    description: "Remember all the baby items in 10 seconds!",
    icon: <Baby size={24} />,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: GameId.WHO_SAID_IT,
    title: "Mom or Dad?",
    description: "Who said this funny statement?",
    icon: <MessageCircle size={24} />,
    color: "bg-teal-100 text-teal-600",
  },
  {
    id: GameId.PREDICTIONS,
    title: "Baby Predictions",
    description: "Guess weight, date, and gender.",
    icon: <Star size={24} />,
    color: "bg-amber-100 text-amber-600",
  },
  {
    id: GameId.CRAVINGS,
    title: "Khushbu's Cravings",
    description: "What is mommy craving the most?",
    icon: <Pizza size={24} />,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    id: GameId.SCRAMBLE,
    title: "Word Scramble",
    description: "Unscramble these baby words.",
    icon: <Puzzle size={24} />,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    id: GameId.NAME_SUGGESTIONS,
    title: "Name Suggestions",
    description: "Suggest baby names starting with your letter!",
    icon: <Sparkles size={24} />,
    color: "bg-rose-100 text-rose-600",
  },
];

export const MEMORY_ITEMS: MemoryItem[] = [
  { id: '1', name: 'Baby Bottle', iconName: 'Milk' },
  { id: '2', name: 'Pacifier', iconName: 'Smile' },
  { id: '3', name: 'Diaper', iconName: 'Box' },
  { id: '4', name: 'Rattle', iconName: 'Bell' },
  { id: '5', name: 'Bib', iconName: 'Shirt' },
  { id: '6', name: 'Stroller', iconName: 'ShoppingCart' },
  { id: '7', name: 'Teddy Bear', iconName: 'ToyBrick' },
  { id: '8', name: 'Socks', iconName: 'Footprints' },
  { id: '9', name: 'Lotion', iconName: 'Droplet' },
];

export const WHO_SAID_IT_QUESTIONS: Question[] = [
  { id: 1, text: "I'll handle the night duty, easy peasy.", answer: 'Dad' },
  { id: 2, text: "We need at least 50 cute outfits.", answer: 'Mom' },
  { id: 3, text: "I hope the baby gets my hair.", answer: 'Mom' },
  { id: 4, text: "Can we teach the baby cricket at 6 months?", answer: 'Dad' },
  { id: 5, text: "Wait, diapers cost HOW much?", answer: 'Dad' },
];

export const SCRAMBLE_WORDS: ScrambleWord[] = [
  { id: 1, scrambled: "LTARTE", answer: "RATTLE", hint: "Shake it!" },
  { id: 2, scrambled: "AEIPDR", answer: "DIAPER", hint: "Essential item" },
  { id: 3, scrambled: "RBIC", answer: "CRIB", hint: "Baby's bed" },
  { id: 4, scrambled: "LRTSRLEO", answer: "STROLLER", hint: "For walks" },
  { id: 5, scrambled: "SSLBGENIS", answer: "BLESSINGS", hint: "Good wishes" },
  { id: 6, scrambled: "TBOTLE", answer: "BOTTLE", hint: "For feeding" },
  { id: 7, scrambled: "DYTDE", answer: "TEDDY", hint: "Cuddly friend" },
  { id: 8, scrambled: "NIKPAN", answer: "NAPKIN", hint: "For messes" },
  { id: 9, scrambled: "CPFIAIER", answer: "PACIFIER", hint: "Soothes baby" },
  { id: 10, scrambled: "LBKTANE", answer: "BLANKET", hint: "Keeps warm" },
];

export const CRAVING_QUESTIONS: CravingQuestion[] = [
  {
    id: 1,
    question: "What is Khushbu's #1 late night craving?",
    options: ["Ice Cream", "Pani Puri", "Cold Coco", "Chocolate"],
    answer: "Cold Coco"
  },
  {
    id: 2,
    question: "What is Khushbu's weekend craving?",
    options: ["Pani Puri", "Pizza", "Dosa", "Chaat"],
    answer: "Pani Puri"
  },
  {
    id: 3,
    question: "Craving but something she cannot eat?",
    options: ["Ice Cream", "Spicy Food", "Coffee", "Chocolate"],
    answer: "Ice Cream"
  },
  {
    id: 4,
    question: "Which fruit can she not stand right now?",
    options: ["Banana", "Papaya", "Apple", "Mango"],
    answer: "Papaya"
  },
];

export const GARBA_SONGS: GarbaSong[] = [
  {
    id: 1,
    hint: "A high-energy song from Loveyatri that is a Navratri anthem.",
    options: ["Chogada", "Kamariya", "Rangtaari", "Udi Udi Jaye"],
    answer: "Chogada"
  },
  {
    id: 2,
    hint: "A playful Gujarati folk song famous for its 'Sanedo Sanedo' chorus.",
    options: ["Sanedo", "Bhai Bhai", "Dholida", "Odhani"],
    answer: "Sanedo"
  },
  {
    id: 3,
    hint: "Deepika Padukone's fierce Garba performance in Ram-Leela.",
    options: ["Nagada Sang Dhol", "Dhol Baaje", "Ghoomar", "Lahu Munh Lag Gaya"],
    answer: "Nagada Sang Dhol"
  },
  {
    id: 4,
    hint: "From Gangubai Kathiawadi, known for its powerful dhol beats.",
    options: ["Dholida", "Jhume Re Gori", "Shubhaarambh", "Moti Veraana"],
    answer: "Dholida"
  }
];