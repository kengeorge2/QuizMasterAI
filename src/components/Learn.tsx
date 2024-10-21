import React, { useState } from 'react';
import { BookOpen, Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LearningMaterial {
  title: string;
  content: string;
}

interface LearningTopic {
  id: string;
  title: string;
  image: string;
}

const Learn: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [learningMaterial, setLearningMaterial] = useState<LearningMaterial | null>(null);
  const [loading, setLoading] = useState(false);

  const learningTopics: LearningTopic[] = [
    { id: 'math', title: 'Math', image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { id: 'science', title: 'Science', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { id: 'english', title: 'English', image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { id: 'literacy', title: 'Literacy', image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { id: 'social-studies', title: 'Social Studies', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { id: 'religious-education', title: 'Religious Education', image: 'https://images.unsplash.com/photo-1507434965515-61970f2bd7c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  ];

  const handleTopicSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const material: LearningMaterial = {
        title: `Introduction to ${topic}`,
        content: `This is a brief introduction to ${topic}. In this lesson, we'll cover the basic concepts and principles of ${topic}. 
        
        Key points:
        1. Definition and importance of ${topic}
        2. Historical context and development
        3. Main theories and applications
        4. Current trends and future prospects
        
        As you study ${topic}, remember to take notes and reflect on how these concepts apply to real-world scenarios. 
        After you feel comfortable with this material, you can test your knowledge by taking a quiz on the main page.`
      };

      setLearningMaterial(material);
    } catch (error) {
      console.error('Error fetching learning material:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-200">
      <h2 className="text-2xl font-bold mb-4 flex items-center text-gray-800 dark:text-gray-200">
        <BookOpen className="mr-2" /> Learning Center
      </h2>
      <form onSubmit={handleTopicSubmit} className="mb-6">
        <div className="flex">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic to learn about"
            className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 flex items-center"
          >
            <Search size={24} />
          </button>
        </div>
      </form>

      {loading && (
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p>Loading learning material...</p>
        </div>
      )}

      {learningMaterial && (
        <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{learningMaterial.title}</h3>
          <div className="prose dark:prose-invert max-w-none">
            {learningMaterial.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 dark:text-gray-300">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-6">
            <Link
              to="/"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-200 flex items-center inline-block"
            >
              Take a Quiz
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      )}

      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Learning Topics</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {learningTopics.map((learningTopic) => (
          <div key={learningTopic.id} className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105">
            <img src={learningTopic.image} alt={learningTopic.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">{learningTopic.title}</h4>
              <button
                onClick={() => setTopic(learningTopic.title)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200 w-full"
              >
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Learn;