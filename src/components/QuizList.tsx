import React, { useState } from 'react';
import { PlusCircle, Edit, Trash } from 'lucide-react';
import { User } from '../types/user';

interface Quiz {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  questionCount: number;
  createdBy: string;
}

interface QuizListProps {
  currentUser: User | null;
}

const QuizList: React.FC<QuizListProps> = ({ currentUser }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: '1',
      title: 'Basic Math',
      description: 'Test your basic math skills',
      difficulty: 'Easy',
      questionCount: 10,
      createdBy: 'John Doe',
    },
    {
      id: '2',
      title: 'World Geography',
      description: 'Challenge your knowledge of world geography',
      difficulty: 'Medium',
      questionCount: 15,
      createdBy: 'Jane Smith',
    },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newQuiz, setNewQuiz] = useState<Omit<Quiz, 'id' | 'createdBy'>>({
    title: '',
    description: '',
    difficulty: 'Easy',
    questionCount: 10,
  });

  const handleCreateQuiz = () => {
    const quiz: Quiz = {
      ...newQuiz,
      id: Date.now().toString(),
      createdBy: currentUser?.displayName || currentUser?.email || 'Unknown',
    };
    setQuizzes([...quizzes, quiz]);
    setShowCreateForm(false);
    setNewQuiz({
      title: '',
      description: '',
      difficulty: 'Easy',
      questionCount: 10,
    });
  };

  const handleDeleteQuiz = (id: string) => {
    setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Quizzes</h3>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <PlusCircle className="mr-2" size={18} />
          Create Quiz
        </button>
      </div>
      {showCreateForm && (
        <div className="mb-4 p-4 border rounded">
          <h4 className="text-lg font-semibold mb-2">Create New Quiz</h4>
          <input
            type="text"
            placeholder="Quiz Title"
            value={newQuiz.title}
            onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
          />
          <textarea
            placeholder="Quiz Description"
            value={newQuiz.description}
            onChange={(e) => setNewQuiz({ ...newQuiz, description: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
          />
          <select
            value={newQuiz.difficulty}
            onChange={(e) => setNewQuiz({ ...newQuiz, difficulty: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <input
            type="number"
            placeholder="Number of Questions"
            value={newQuiz.questionCount}
            onChange={(e) => setNewQuiz({ ...newQuiz, questionCount: parseInt(e.target.value) })}
            className="w-full p-2 mb-2 border rounded"
          />
          <button
            onClick={handleCreateQuiz}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create
          </button>
        </div>
      )}
      <ul className="space-y-4">
        {quizzes.map((quiz) => (
          <li key={quiz.id} className="border-b pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{quiz.title}</h4>
                <p className="text-sm text-gray-600">{quiz.description}</p>
                <p className="text-sm text-gray-600">
                  Difficulty: {quiz.difficulty} | Questions: {quiz.questionCount}
                </p>
                <p className="text-sm text-gray-600">Created by: {quiz.createdBy}</p>
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-500 hover:text-blue-700">
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDeleteQuiz(quiz.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash size={18} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;