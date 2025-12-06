import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Calendar, User, Scale } from 'lucide-react';

interface Props {
  onComplete: (score: number, data?: any) => void;
  onBack: () => void;
}

export const Predictions: React.FC<Props> = ({ onComplete, onBack }) => {
  const [formData, setFormData] = useState({
    date: '',
    gender: '',
    weight: '',
    looksLike: 'Mom',
    advice: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate API call
    setTimeout(() => {
      // Pass the formData back so it can be saved to the profile/database
      onComplete(50, formData); 
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="flex flex-col h-full justify-center items-center text-center space-y-4 animate-fadeIn">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-4">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Predictions Locked!</h2>
        <p className="text-gray-500">Thanks for your guess. We'll see who wins when the baby arrives!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-yellow-600">Crystal Ball 🔮</h2>
        <button onClick={onBack} className="text-gray-400">Back</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 pb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Birth Date Guess</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input 
              type="date" 
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none"
              onChange={e => setFormData({...formData, date: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender Guess</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className={`p-3 rounded-xl border-2 flex items-center justify-center space-x-2 ${formData.gender === 'Boy' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200'}`}
              onClick={() => setFormData({...formData, gender: 'Boy'})}
            >
              <span>👦 Boy</span>
            </button>
            <button
              type="button"
              className={`p-3 rounded-xl border-2 flex items-center justify-center space-x-2 ${formData.gender === 'Girl' ? 'border-pink-500 bg-pink-50 text-pink-700' : 'border-gray-200'}`}
              onClick={() => setFormData({...formData, gender: 'Girl'})}
            >
              <span>👧 Girl</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Weight Guess (lbs/kg)</label>
          <div className="relative">
            <Scale className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="e.g. 6lbs 5oz"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none"
              onChange={e => setFormData({...formData, weight: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Who will baby look like?</label>
          <div className="flex items-center space-x-4">
             <label className="flex items-center space-x-2 p-3 bg-white rounded-xl flex-1 border border-gray-200">
               <input type="radio" name="looks" value="Mom" className="text-yellow-500 focus:ring-yellow-500" onChange={() => setFormData({...formData, looksLike: 'Mom'})} defaultChecked />
               <span>Mom</span>
             </label>
             <label className="flex items-center space-x-2 p-3 bg-white rounded-xl flex-1 border border-gray-200">
               <input type="radio" name="looks" value="Dad" className="text-yellow-500 focus:ring-yellow-500" onChange={() => setFormData({...formData, looksLike: 'Dad'})} />
               <span>Dad</span>
             </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Advice for Parents</label>
          <textarea 
            rows={3}
            placeholder="Sleep now while you can..."
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none resize-none"
            onChange={e => setFormData({...formData, advice: e.target.value})}
          />
        </div>

        <Button type="submit" fullWidth className="bg-yellow-500 hover:bg-yellow-600 border-yellow-700 text-white">
          Lock It In 🔒
        </Button>
      </form>
    </div>
  );
};