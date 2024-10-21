import React, { useState, useEffect } from 'react';
import { Clock, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';

interface QuizProps {
  questions: any[];
  onSubmit: (answers: string[], time: number) => void;
  timeLimit: number;
}

const Quiz: React.FC<QuizProps> = ({ questions, onSubmit, timeLimit }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(''));
  const [timeSpent, setTimeSpent] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent((prevTime) => {
        if (timeLimit > 0 && prevTime + 1 >= timeLimit * 60) {
          clearInterval(timer);
          setIsTimeUp(true);
          return timeLimit * 60;
        }
        return prevTime + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLimit]);

  useEffect(() => {
    if (isTimeUp) {
      handleSubmit();
    }
  }, [isTimeUp]);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(answers, timeSpent);
  };

  const question = questions[currentQuestion];

  return (
    <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Question {currentQuestion + 1} of {questions.length}</h2>
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <Clock className="mr-2" />
          <span>{Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}</span>
          {timeLimit > 0 && (
            <span className="ml-2">/ {timeLimit}:00</span>
          )}
        </div>
      </div>
      {isTimeUp && (
        <div className="mb-4 p-2 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded flex items-center">
          <AlertCircle className="mr-2" />
          Time's up! Your answers have been submitted.
        </div>
      )}
      <p className="mb-4 text-gray-700 dark:text-gray-300">{question.question}</p>
      <div className="space-y-2 mb-4">
        {question.options.map((option: string, index: number) => (
          <button
            key={index}
            className={`w-full p-2 text-left rounded transition duration-200 ${
              answers[currentQuestion] === option
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
            onClick={() => handleAnswer(option)}
            disabled={isTimeUp}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0 || isTimeUp}
          className={`flex items-center ${
            currentQuestion === 0 || isTimeUp
              ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-700'
          } text-white font-bold py-2 px-4 rounded transition duration-200`}
        >
          <ArrowLeft className="mr-2" size={18} />
          Previous
        </button>
        {currentQuestion === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={isTimeUp}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={isTimeUp}
            className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Next
            <ArrowRight className="ml-2" size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;