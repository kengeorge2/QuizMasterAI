import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface QuizHistoryItem {
  topic: string;
  difficulty: string;
  score: number;
  timeSpent: number;
  date: string;
}

interface ProgressChartProps {
  quizHistory: QuizHistoryItem[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ quizHistory }) => {
  const sortedHistory = [...quizHistory].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const data = {
    labels: sortedHistory.map(quiz => quiz.date),
    datasets: [
      {
        label: 'Quiz Scores',
        data: sortedHistory.map(quiz => quiz.score),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Quiz Score Progress',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default ProgressChart;