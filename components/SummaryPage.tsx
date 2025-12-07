import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { Send, Loader2, CheckCircle, Sparkles } from 'lucide-react';
import { getRandomLetters } from '../services/letterService';

interface SummaryData {
    name: string;
    gender: string;
    weight: string;
    date: string;
    assignedLetter: string;
    boyName: string;
    girlName: string;
}

interface Props {
    onBack: () => void;
}

export const SummaryPage: React.FC<Props> = ({ onBack }) => {
    const [formData, setFormData] = useState<SummaryData>({
        name: '',
        gender: '',
        weight: '',
        date: '',
        assignedLetter: '',
        boyName: '',
        girlName: '',
    });

    const [loadingLetter, setLoadingLetter] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    // Get random letter on mount
    useEffect(() => {
        const fetchLetter = async () => {
            setLoadingLetter(true);
            const letter = await getRandomLetters();
            setFormData(prev => ({ ...prev, assignedLetter: letter }));
            setLoadingLetter(false);
        };
        fetchLetter();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);
        setShowError(false);

        try {
            const response = await fetch('/api/submit-summary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit');
            }

            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                // Reset form
                setFormData({
                    name: '',
                    gender: '',
                    weight: '',
                    date: '',
                    assignedLetter: formData.assignedLetter,
                    boyName: '',
                    girlName: '',
                });
            }, 3000);
        } catch (error) {
            console.error('Submission error:', error);
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid = formData.name.trim() &&
        formData.gender &&
        formData.weight.trim() &&
        formData.date &&
        formData.boyName.trim() &&
        formData.girlName.trim();

    if (showSuccess) {
        return (
            <div className="flex flex-col h-full justify-center items-center text-center space-y-6 animate-fadeIn">
                <div className="bg-green-100 p-6 rounded-full">
                    <CheckCircle className="w-16 h-16 text-green-600" />
                </div>
                <h2 className="text-3xl font-festive text-green-600">Submitted!</h2>
                <p className="text-gray-700">Thank you for your predictions and name suggestions! 💝</p>
                <Button fullWidth onClick={onBack}>Back to Home</Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-purple-600">Summary Form</h2>
                <button onClick={onBack} className="text-gray-400">Exit</button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-4 pb-24">
                {/* Name Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name *
                    </label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your name"
                        className="w-full p-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none"
                        required
                    />
                </div>

                {/* Baby Predictions Section */}
                <div className="bg-amber-50 p-4 rounded-xl border-2 border-amber-200">
                    <h3 className="font-bold text-amber-700 mb-3 flex items-center gap-2">
                        <span>👶</span> Baby Predictions
                    </h3>

                    <div className="space-y-3">
                        {/* Gender */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Gender Prediction *
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, gender: 'Boy' })}
                                    className={`p-3 rounded-xl font-semibold transition-all ${formData.gender === 'Boy'
                                            ? 'bg-blue-500 text-white border-2 border-blue-600'
                                            : 'bg-white text-gray-700 border-2 border-gray-200'
                                        }`}
                                >
                                    👦 Boy
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, gender: 'Girl' })}
                                    className={`p-3 rounded-xl font-semibold transition-all ${formData.gender === 'Girl'
                                            ? 'bg-pink-500 text-white border-2 border-pink-600'
                                            : 'bg-white text-gray-700 border-2 border-gray-200'
                                        }`}
                                >
                                    👧 Girl
                                </button>
                            </div>
                        </div>

                        {/* Weight */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Weight Prediction (lbs) *
                            </label>
                            <input
                                type="text"
                                value={formData.weight}
                                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                placeholder="e.g., 7.5"
                                className="w-full p-3 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:outline-none"
                                required
                            />
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Birth Date Prediction *
                            </label>
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full p-3 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:outline-none"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Name Suggestions Section */}
                <div className="bg-rose-50 p-4 rounded-xl border-2 border-rose-200">
                    <h3 className="font-bold text-rose-700 mb-3 flex items-center gap-2">
                        <Sparkles size={20} /> Name Suggestions
                    </h3>

                    {loadingLetter ? (
                        <div className="flex items-center justify-center py-4">
                            <Loader2 className="w-6 h-6 text-rose-600 animate-spin" />
                            <span className="ml-2 text-gray-500">Getting your letter...</span>
                        </div>
                    ) : (
                        <>
                            <div className="text-center mb-4">
                                <p className="text-sm text-gray-600 mb-2">Your assigned letter:</p>
                                <div className="bg-gradient-to-br from-rose-100 to-pink-100 p-4 rounded-2xl border-2 border-rose-300 inline-block">
                                    <span className="text-5xl font-black text-rose-600">{formData.assignedLetter}</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {/* Boy Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Boy Name Suggestion *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.boyName}
                                        onChange={(e) => setFormData({ ...formData, boyName: e.target.value })}
                                        placeholder={`e.g., ${formData.assignedLetter}ayan`}
                                        className="w-full p-3 rounded-xl border-2 border-rose-200 focus:border-rose-500 focus:outline-none"
                                        required
                                    />
                                </div>

                                {/* Girl Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Girl Name Suggestion *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.girlName}
                                        onChange={(e) => setFormData({ ...formData, girlName: e.target.value })}
                                        placeholder={`e.g., ${formData.assignedLetter}ara`}
                                        className="w-full p-3 rounded-xl border-2 border-rose-200 focus:border-rose-500 focus:outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <p className="text-xs text-gray-500 mt-3 text-center">
                                💡 Tip: Those who know the gender can suggest 2 names of that gender!
                            </p>
                        </>
                    )}
                </div>

                {/* Submit Button - Sticky */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent">
                    <div className="max-w-md mx-auto">
                        <Button
                            fullWidth
                            type="submit"
                            disabled={!isFormValid || isSubmitting || loadingLetter}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={20} className="animate-spin mr-2" />
                                    <span>Submitting...</span>
                                </>
                            ) : (
                                <>
                                    <Send size={20} className="mr-2" />
                                    <span>Submit Summary</span>
                                </>
                            )}
                        </Button>
                        {showError && (
                            <p className="text-red-500 text-sm text-center mt-2">
                                Failed to submit. Please try again.
                            </p>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};
