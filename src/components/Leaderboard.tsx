import React from 'react';
import { Trophy } from 'lucide-react';

interface LeaderboardEntry {
  userId: string;
  displayName: string;
  avatar?: string;
  score: number;
  topic: string;
  difficulty: string;
  timeSpent: number;
}

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ leaderboard }) => {
  return (
    <div className="w-full max-w-md mt-8">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Trophy className="mr-2" /> Leaderboard
      </h2>
      {leaderboard.length > 0 ? (
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Rank</th>
              <th className="p-2 text-left">User</th>
              <th className="p-2 text-left">Score</th>
              <th className="p-2 text-left">Topic</th>
              <th className="p-2 text-left">Difficulty</th>
              <th className="p-2 text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                <td className="p-2">{index + 1}</td>
                <td className="p-2 flex items-center">
                  {entry.avatar && (
                    <img src={entry.avatar} alt="Avatar" className="w-6 h-6 rounded-full mr-2" />
                  )}
                  {entry.displayName}
                </td>
                <td className="p-2">{entry.score}</td>
                <td className="p-2">{entry.topic}</td>
                <td className="p-2">{entry.difficulty}</td>
                <td className="p-2">
                  {Math.floor(entry.timeSpent / 60)}:{(entry.timeSpent % 60).toString().padStart(2, '0')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No entries yet. Be the first to complete a quiz!</p>
      )}
    </div>
  );
};

export default Leaderboard;