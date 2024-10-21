import React, { useState } from 'react';
import { Book, BarChart2, HelpCircle, Clock } from 'lucide-react';
import QuizGenerator from './QuizGenerator';
import Quiz from './Quiz';

interface TopicInputProps {
  onSubmit: (topic: string, questions: any[], answers: string[], time: number) => void;
}

const TopicInput: React.FC<TopicInputProps> = ({ onSubmit }) => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [questionCount, setQuestionCount] = useState(5);
  const [timeLimit, setTimeLimit] = useState(0); // 0 means no time limit
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      setQuizStarted(true);
    }
  };

  const handleQuizGenerated = (generatedQuestions: any[]) => {
    setQuestions(generatedQuestions);
  };

  const handleQuizSubmit = (answers: string[], time: number) => {
    onSubmit(topic, questions, answers, time);
  };

  if (quizStarted && questions.length === 0) {
    return (
      <QuizGenerator
        topic={topic}
        difficulty={difficulty}
        questionCount={questionCount}
        onQuizGenerated={handleQuizGenerated}
      />
    );
  }

  if (questions.length > 0) {
    return <Quiz questions={questions} onSubmit={handleQuizSubmit} timeLimit={timeLimit} />;
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-200">
      <div className="mb-4">
        <label htmlFor="topic" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
          Quiz Topic
        </label>
        <div className="relative">
          <Book className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            id="topic"
            className="appearance-none bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded w-full py-2 px-4 pl-10 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
            type="text"
            placeholder="Enter a quiz topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="difficulty" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
          Difficulty
        </label>
        <div className="relative">
          <BarChart2 className="absolute left-3 top-3 text-gray-400" size={20} />
          <select
            id="difficulty"
            className="block appearance-none w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 pl-10 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="questionCount" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
          Number of Questions
        </label>
        <div className="relative">
          <HelpCircle className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            id="questionCount"
            type="number"
            min="1"
            max="20"
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            className="appearance-none bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded w-full py-2 px-4 pl-10 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="timeLimit" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
          Time Limit (minutes, 0 for no limit)
        </label>
        <div className="relative">
          <Clock className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            id="timeLimit"
            type="number"
            min="0"
            max="60"
            value={timeLimit}
            onChange={(e) => setTimeLimit(Number(e.target.value))}
            className="appearance-none bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded w-full py-2 px-4 pl-10 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
          />
        </div>
      </div>
      <button
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
        type="submit"
      >
        Generate Quiz
      </button>
    </form>
  );
};

export default TopicInput;