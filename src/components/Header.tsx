import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, BookOpen, Sun, Moon, Settings } from 'lucide-react';
import { User as UserType } from '../types/user';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  isLoggedIn: boolean;
  onLogout: () => void;
  currentUser: UserType | null;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogout, currentUser }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <header className="w-full bg-white dark:bg-gray-800 shadow-md py-4 px-6 flex justify-between items-center transition-colors duration-200">
      <div className="flex items-center">
        {isLoggedIn && currentUser?.avatar && (
          <img src={currentUser.avatar} alt="User Avatar" className="w-10 h-10 rounded-full mr-4 object-cover" />
        )}
        <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Quiz AI
        </Link>
      </div>
      <nav className="flex items-center">
        <button
          onClick={toggleTheme}
          className="mr-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        {isLoggedIn && currentUser ? (
          <>
            <Link to="/learn" className="mr-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">
              <BookOpen className="inline-block mr-1" size={18} />
              Learn
            </Link>
            <Link to="/dashboard" className="mr-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">
              <User className="inline-block mr-1" size={18} />
              Dashboard
            </Link>
            {currentUser.role === 'admin' && (
              <Link to="/admin" className="mr-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">
                <Settings className="inline-block mr-1" size={18} />
                Admin
              </Link>
            )}
            <span className="mr-4 text-gray-600 dark:text-gray-300">
              {currentUser.displayName || currentUser.email} ({currentUser.role})
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center transition duration-200"
            >
              <LogOut className="mr-2" size={18} />
              Logout
            </button>
          </>
        ) : (
          <div>
            <Link to="/login" className="mr-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">
              Login
            </Link>
            <Link to="/signup" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;