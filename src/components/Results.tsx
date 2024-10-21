import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, RefreshCw, Award, Share2 } from 'lucide-react';

interface ResultsProps {
  questions: any[];
  userAnswers: string[];
  timeSpent: number;
  onRetry: () => void;
  onAddToLeaderboard: (score: number) => void;
}

const Results: React.FC<ResultsProps> = ({ questions, userAnswers, timeSpent, onRetry, onAddToLeaderboard }) => {
  const [showCorrections, setShowCorrections] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const score = questions.reduce((acc, question, index) => {
    return acc + (question.correctAnswer === userAnswers[index] ? 1 : 0);
  }, 0);

  const handleAddToLeaderboard = () => {
    onAddToLeaderboard(score);
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
  };

  const shareText = `I scored ${score} out of ${questions.length} on the Quiz AI Generation App! Can you beat my score?`;

  return (
    <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Quiz Results</h2>
      <div className="flex justify-between items-center mb-4">
        <p className="text-xl text-gray-700 dark:text-gray-300">
          You scored <span className="font-bold text-green-500">{score}</span> out of {questions.length}
        </p>
        <p className="text-lg flex items-center text-gray-600 dark:text-gray-400">
          <Clock className="mr-2" />
          Time: {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
        </p>
      </div>
      <div className="flex space-x-4 mb-6">
        <button
          className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 flex items-center justify-center"
          onClick={() => setShowCorrections(!showCorrections)}
        >
          {showCorrections ? 'Hide' : 'Show'} Corrections
        </button>
        <button
          className="flex-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200 flex items-center justify-center"
          onClick={onRetry}
        >
          <RefreshCw className="mr-2" size={18} />
          Try Another Quiz
        </button>
      </div>
      {showCorrections && (
        <div className="space-y-4 mb-6">
          {questions.map((question, index) => (
            <div key={index} className="border dark:border-gray-700 p-4 rounded">
              <p className="font-bold text-gray-800 dark:text-gray-200 mb-2">{question.question}</p>
              <p className="flex items-center text-gray-700 dark:text-gray-300">
                Your answer: {userAnswers[index]}
                {question.correctAnswer === userAnswers[index] ? (
                  <CheckCircle className="text-green-500 ml-2" />
                ) : (
                  <XCircle className="text-red-500 ml-2" />
                )}
              </p>
              {question.correctAnswer !== userAnswers[index] && (
                <p className="text-green-600 dark:text-green-400 mt-1">Correct answer: {question.correctAnswer}</p>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="flex space-x-4">
        <button
          onClick={handleAddToLeaderboard}
          className="flex-1 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-200 flex items-center justify-center"
        >
          <Award className="mr-2" size={18} />
          Add to Leaderboard
        </button>
        <button
          onClick={handleShare}
          className="flex-1 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 flex items-center justify-center"
        >
          <Share2 className="mr-2" size={18} />
          Share Result
        </button>
      </div>

      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Share Your Result</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">{shareText}</p>
            <div className="flex justify-end">
              <button
                onClick={closeShareModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;