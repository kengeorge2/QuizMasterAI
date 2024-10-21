import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface QuizGeneratorProps {
  topic: string;
  difficulty: string;
  questionCount: number;
  onQuizGenerated: (questions: any[]) => void;
}

const QuizGenerator: React.FC<QuizGeneratorProps> = ({ topic, difficulty, questionCount, onQuizGenerated }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateQuiz = async () => {
      try {
        // In a real application, you would make an API call to OpenAI here
        // For this example, we'll simulate the API call with a timeout
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const sampleQuestions = [
          {
            question: `What is the capital of France?`,
            options: ['London', 'Berlin', 'Paris', 'Madrid'],
            correctAnswer: 'Paris',
          },
          {
            question: `Which planet is known as the Red Planet?`,
            options: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
            correctAnswer: 'Mars',
          },
          {
            question: `Who painted the Mona Lisa?`,
            options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Michelangelo'],
            correctAnswer: 'Leonardo da Vinci',
          },
          {
            question: `What is the largest ocean on Earth?`,
            options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
            correctAnswer: 'Pacific Ocean',
          },
          {
            question: `Which element has the chemical symbol 'O'?`,
            options: ['Gold', 'Silver', 'Oxygen', 'Iron'],
            correctAnswer: 'Oxygen',
          },
          {
            question: `What is the capital of Japan?`,
            options: ['Seoul', 'Beijing', 'Tokyo', 'Bangkok'],
            correctAnswer: 'Tokyo',
          },
          {
            question: `Who wrote the play "Romeo and Juliet"?`,
            options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
            correctAnswer: 'William Shakespeare',
          },
          {
            question: `What is the largest mammal in the world?`,
            options: ['African Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
            correctAnswer: 'Blue Whale',
          },
          {
            question: `Which country is home to the Great Barrier Reef?`,
            options: ['Brazil', 'Indonesia', 'Australia', 'Mexico'],
            correctAnswer: 'Australia',
          },
          {
            question: `What is the hardest natural substance on Earth?`,
            options: ['Gold', 'Iron', 'Diamond', 'Titanium'],
            correctAnswer: 'Diamond',
          },
        ];

        // Slice the sample questions array to match the requested question count
        const generatedQuestions = sampleQuestions.slice(0, questionCount);

        onQuizGenerated(generatedQuestions);
      } catch (error) {
        console.error('Error generating quiz:', error);
      } finally {
        setLoading(false);
      }
    };

    generateQuiz();
  }, [topic, difficulty, questionCount, onQuizGenerated]);

  return (
    <div className="text-center">
      {loading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin mr-2" />
          <p>Generating {difficulty} quiz about {topic} with {questionCount} questions...</p>
        </div>
      ) : (
        <p>Quiz generated! Ready to start.</p>
      )}
    </div>
  );
};

export default QuizGenerator;