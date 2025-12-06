import React, { useEffect, useState } from 'react';
import { getLeaderboardData, getPredictionStats } from '../services/database';
import { UserProfile } from '../types';
import { Button } from './ui/Button';
import { Trophy, Users, PieChart, RefreshCw } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export const HostDashboard: React.FC<Props> = ({ onBack }) => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [stats, setStats] = useState({ boyCount: 0, girlCount: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const data = await getLeaderboardData();
    const statData = await getPredictionStats();
    setUsers(data);
    setStats(statData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // Auto refresh every 10 seconds to simulate real-time
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full bg-gray-50 p-4 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Users className="text-orange-500" />
          Live Results
        </h1>
        <Button variant="outline" onClick={onBack} className="!py-2 !px-4 text-sm">
          Exit View
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full overflow-y-auto pb-20">
        {/* Leaderboard Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2">
              <Trophy className="text-yellow-500" />
              Leaderboard
            </h2>
            <button onClick={fetchData} className="text-gray-400 hover:text-orange-500 transition-colors">
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
          
          <div className="overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-400 border-b border-gray-100">
                  <th className="pb-2 font-medium">Rank</th>
                  <th className="pb-2 font-medium">Guest</th>
                  <th className="pb-2 font-medium text-right">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((user, index) => (
                  <tr key={user.id} className={`group ${index < 3 ? 'font-semibold' : 'text-gray-600'}`}>
                    <td className="py-3">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm
                        ${index === 0 ? 'bg-yellow-100 text-yellow-700' : 
                          index === 1 ? 'bg-gray-100 text-gray-700' : 
                          index === 2 ? 'bg-orange-100 text-orange-800' : 'text-gray-400'}
                      `}>
                        {index + 1}
                      </span>
                    </td>
                    <td className="py-3">{user.name}</td>
                    <td className="py-3 text-right text-orange-600">{user.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Predictions Stats Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col">
          <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2 mb-6">
            <PieChart className="text-purple-500" />
            Gender Poll
          </h2>

          <div className="flex-1 flex flex-col justify-center items-center">
             <div className="flex items-end space-x-8 mb-6">
               {/* Boy Bar */}
               <div className="flex flex-col items-center">
                 <div className="text-xl font-bold text-blue-600 mb-2">
                   {stats.total > 0 ? Math.round((stats.boyCount / stats.total) * 100) : 0}%
                 </div>
                 <div className="w-16 bg-blue-100 rounded-t-lg relative overflow-hidden transition-all duration-1000" style={{ height: '150px' }}>
                    <div 
                      className="absolute bottom-0 w-full bg-blue-500 transition-all duration-1000"
                      style={{ height: `${stats.total > 0 ? (stats.boyCount / stats.total) * 100 : 0}%` }}
                    ></div>
                 </div>
                 <div className="mt-2 font-bold text-gray-600">Boy</div>
                 <div className="text-xs text-gray-400">{stats.boyCount} votes</div>
               </div>

               {/* Girl Bar */}
               <div className="flex flex-col items-center">
                 <div className="text-xl font-bold text-pink-600 mb-2">
                    {stats.total > 0 ? Math.round((stats.girlCount / stats.total) * 100) : 0}%
                 </div>
                 <div className="w-16 bg-pink-100 rounded-t-lg relative overflow-hidden transition-all duration-1000" style={{ height: '150px' }}>
                    <div 
                      className="absolute bottom-0 w-full bg-pink-500 transition-all duration-1000"
                      style={{ height: `${stats.total > 0 ? (stats.girlCount / stats.total) * 100 : 0}%` }}
                    ></div>
                 </div>
                 <div className="mt-2 font-bold text-gray-600">Girl</div>
                 <div className="text-xs text-gray-400">{stats.girlCount} votes</div>
               </div>
             </div>
             
             <p className="text-center text-sm text-gray-400">Based on {stats.total} predictions</p>
          </div>
        </div>
      </div>
    </div>
  );
};
