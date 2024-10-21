import React, { useState, useEffect } from 'react';
import { Brain } from 'lucide-react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TopicInput from './components/TopicInput';
import Results from './components/Results';
import Leaderboard from './components/Leaderboard';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import EmailVerification from './components/EmailVerification';
import SetupComplete from './components/SetupComplete';
import Header from './components/Header';
import Learn from './components/Learn';
import AdminCenter from './components/AdminCenter';
import { User, SignupData } from './types/user';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [quizHistory, setQuizHistory] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<{ topic: string, questions: any[] } | null>(null);

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    // Implement your login logic here
    // For demo purposes, we'll just set isLoggedIn to true
    setIsLoggedIn(true);
    setCurrentUser({ id: '1', email, role: 'admin' }); // Set role to 'admin' for testing
    return true;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleSignup = async (data: SignupData): Promise<string> => {
    // Implement your signup logic here
    // For demo purposes, we'll just return a fake verification code
    console.log('Signup:', data);
    return '123456';
  };

  const handleVerifyEmail = async (email: string, code: string, accountType: string, organizationName?: string, role?: string): Promise<boolean> => {
    // Implement your email verification logic here
    // For demo purposes, we'll just return true
    console.log('Verify Email:', { email, code, accountType, organizationName, role });
    setIsLoggedIn(true);
    setCurrentUser({ id: '1', email, role: role as User['role'] || 'student', organizationId: accountType === 'organization' ? '1' : undefined });
    return true;
  };

  const handleUpdateUserInfo = (displayName: string, avatar: string) => {
    setCurrentUser(prev => prev ? { ...prev, displayName, avatar } : null);
  };

  const handleQuizSubmit = (topic: string, questions: any[], answers: string[], time: number) => {
    const score = questions.reduce((acc, question, index) => {
      return acc + (question.correctAnswer === answers[index] ? 1 : 0);
    }, 0);

    const quizResult = {
      topic,
      score,
      totalQuestions: questions.length,
      timeSpent: time,
    };

    setQuizHistory([...quizHistory, quizResult]);
    setCurrentQuiz({ topic, questions });
  };

  const handleAddToLeaderboard = (score: number) => {
    if (currentUser && currentQuiz) {
      const leaderboardEntry = {
        userId: currentUser.id,
        displayName: currentUser.displayName || currentUser.email,
        avatar: currentUser.avatar,
        score,
        topic: currentQuiz.topic,
        difficulty: 'medium', // You might want to store this in currentQuiz
        timeSpent: 0, // You might want to store this in currentQuiz
      };
      setLeaderboard([...leaderboard, leaderboardEntry]);
    }
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col transition-colors duration-200">
          <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} currentUser={currentUser} />
          <div className="flex-grow flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold mb-8 flex items-center text-gray-800 dark:text-gray-200">
              <Brain className="mr-2" /> Quiz AI Generator
            </h1>
            <Routes>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
              <Route path="/verify-email" element={<EmailVerification onVerify={handleVerifyEmail} />} />
              <Route path="/setup-complete" element={<SetupComplete />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Dashboard
                      quizHistory={quizHistory}
                      currentUser={currentUser}
                      onUpdateUserInfo={handleUpdateUserInfo}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/learn"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Learn />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn && currentUser?.role === 'admin'}>
                    <AdminCenter />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/"
                element={
                  isLoggedIn ? (
                    currentQuiz ? (
                      <Results
                        questions={currentQuiz.questions}
                        userAnswers={[]} // You need to pass the user's answers here
                        timeSpent={0} // You need to pass the time spent here
                        onRetry={() => setCurrentQuiz(null)}
                        onAddToLeaderboard={handleAddToLeaderboard}
                      />
                    ) : (
                      <TopicInput onSubmit={handleQuizSubmit} />
                    )
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;