import React, { useState, useRef } from 'react';
import { BarChart, Clock, User, Camera, Book, Users, PlusCircle, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { User as UserType } from '../types/user';
import QuizList from './QuizList';
import UserManagement from './UserManagement';
import ProgressChart from './ProgressChart';

interface QuizHistoryItem {
  topic: string;
  difficulty: string;
  score: number;
  timeSpent: number;
  date: string;
}

interface DashboardProps {
  quizHistory: QuizHistoryItem[];
  currentUser: UserType | null;
  onUpdateUserInfo: (displayName: string, avatar: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ quizHistory, currentUser, onUpdateUserInfo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [avatar, setAvatar] = useState(currentUser?.avatar || '');
  const [activeTab, setActiveTab] = useState('overview');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveUserInfo = () => {
    onUpdateUserInfo(displayName, avatar);
    setIsEditing(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateAverageScore = () => {
    if (quizHistory.length === 0) return 0;
    const totalScore = quizHistory.reduce((sum, quiz) => sum + quiz.score, 0);
    return (totalScore / quizHistory.length).toFixed(2);
  };

  const calculateAverageTime = () => {
    if (quizHistory.length === 0) return 0;
    const totalTime = quizHistory.reduce((sum, quiz) => sum + quiz.timeSpent, 0);
    return Math.round(totalTime / quizHistory.length);
  };

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-gray-200">
          <BarChart className="mr-2" /> Quiz Statistics
        </h3>
        <p className="text-gray-700 dark:text-gray-300">Total Quizzes: {quizHistory.length}</p>
        <p className="text-gray-700 dark:text-gray-300">Average Score: {calculateAverageScore()}</p>
        <p className="flex items-center text-gray-700 dark:text-gray-300">
          <Clock className="mr-2" /> Average Time: {Math.floor(calculateAverageTime() / 60)}:
          {(calculateAverageTime() % 60).toString().padStart(2, '0')}
        </p>
      </div>
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Recent Quizzes</h3>
        <ul className="space-y-2">
          {quizHistory.slice(-5).reverse().map((quiz, index) => (
            <li key={index} className="border-b border-gray-200 dark:border-gray-600 pb-2">
              <p className="font-semibold text-gray-800 dark:text-gray-200">{quiz.topic}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Score: {quiz.score} | Difficulty: {quiz.difficulty}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md col-span-2">
        <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-gray-200">
          <TrendingUp className="mr-2" /> Progress Chart
        </h3>
        <ProgressChart quizHistory={quizHistory} />
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Dashboard</h2>
        <div className="flex items-center">
          {isEditing ? (
            <div className="flex items-center mr-4">
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="mr-2 p-1 border rounded dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                placeholder="Display Name"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm flex items-center mr-2"
              >
                <Camera className="w-4 h-4 mr-1" /> Upload Photo
              </button>
              <button
                onClick={handleSaveUserInfo}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex items-center mr-4">
              {currentUser?.avatar && (
                <img src={currentUser.avatar} alt="Avatar" className="w-8 h-8 rounded-full mr-2" />
              )}
              <span className="mr-2 text-gray-600 dark:text-gray-400">{currentUser?.displayName || currentUser?.email}</span>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm flex items-center"
              >
                <User className="w-4 h-4 mr-1" /> Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mb-6">
        <nav className="flex space-x-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-2 rounded-md ${
              activeTab === 'overview' ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('quizzes')}
            className={`px-3 py-2 rounded-md ${
              activeTab === 'quizzes' ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Quizzes
          </button>
          {currentUser?.role === 'admin' && (
            <button
              onClick={() => setActiveTab('users')}
              className={`px-3 py-2 rounded-md ${
                activeTab === 'users' ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              User Management
            </button>
          )}
        </nav>
      </div>
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'quizzes' && <QuizList currentUser={currentUser} />}
      {activeTab === 'users' && currentUser?.role === 'admin' && <UserManagement />}
    </div>
  );
};

export default Dashboard;