import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Sparkles, Loader2 } from 'lucide-react';
import { getRandomLetters } from '../../services/letterService';

interface Props {
    onComplete: (score: number, data: { letter: string; boyName: string; girlName: string }) => void;
    onBack: () => void;
}

export const NameSuggestions: React.FC<Props> = ({ onComplete, onBack }) => {
    const [letter, setLetter] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [boyName, setBoyName] = useState('');
    const [girlName, setGirlName] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        // Get random letter when component mounts
        const fetchLetter = async () => {
            setLoading(true);
            const randomLetter = await getRandomLetters();
            setLetter(randomLetter);
            setLoading(false);
        };
        fetchLetter();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!boyName.trim() || !girlName.trim()) return;

        setSubmitted(true);

        // Award points for completing the activity
        setTimeout(() => {
            onComplete(10, {
                letter,
                boyName: boyName.trim(),
                girlName: girlName.trim(),
            });
        }, 1500);
    };

    if (loading) {
        return (
            <div className="flex flex-col h-full justify-center items-center">
                <Loader2 className="w-12 h-12 text-rose-600 animate-spin mb-4" />
                <p className="text-gray-500">Getting your letter...</p>
            </div>
        );
    }

    if (submitted) {
        return (
            <div className="flex flex-col h-full justify-center items-center text-center space-y-6 animate-fadeIn">
                <div className="bg-rose-100 p-6 rounded-full">
                    <Sparkles className="w-16 h-16 text-rose-600" />
                </div>
                <h2 className="text-3xl font-festive text-rose-600">Beautiful Names!</h2>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-rose-100 space-y-3">
                    <p className="text-gray-700">
                        <span className="font-bold">Letter:</span> {letter}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-bold">Boy Name:</span> {boyName}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-bold">Girl Name:</span> {girlName}
                    </p>
                </div>
                <p className="text-gray-500">Thank you for your suggestions! 💝</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-rose-600">Name Suggestions</h2>
                <button onClick={onBack} className="text-gray-400">Exit</button>
            </div>

            <div className="flex-1 flex flex-col justify-center space-y-6">
                {/* Letter Display */}
                <div className="text-center space-y-3">
                    <p className="text-gray-600">Your letter is:</p>
                    <div className="bg-gradient-to-br from-rose-100 to-pink-100 p-8 rounded-3xl shadow-lg border-4 border-rose-200">
                        <span className="text-8xl font-black text-rose-600">{letter}</span>
                    </div>
                    <p className="text-sm text-gray-500">
                        Suggest 2 names starting with this letter!
                    </p>
                </div>

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Boy Name 👦
                        </label>
                        <input
                            type="text"
                            value={boyName}
                            onChange={(e) => setBoyName(e.target.value)}
                            placeholder={`e.g., ${letter}ayan`}
                            className="w-full p-4 rounded-xl border-2 border-rose-200 focus:border-rose-500 focus:outline-none transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Girl Name 👧
                        </label>
                        <input
                            type="text"
                            value={girlName}
                            onChange={(e) => setGirlName(e.target.value)}
                            placeholder={`e.g., ${letter}ara`}
                            className="w-full p-4 rounded-xl border-2 border-rose-200 focus:border-rose-500 focus:outline-none transition-colors"
                            required
                        />
                    </div>

                    <div className="pt-4">
                        <Button
                            fullWidth
                            type="submit"
                            disabled={!boyName.trim() || !girlName.trim()}
                        >
                            Submit Names
                        </Button>
                    </div>
                </form>

                <p className="text-xs text-center text-gray-400">
                    💡 Tip: Those who know the gender can suggest 2 names of that gender!
                </p>
            </div>
        </div>
    );
};
