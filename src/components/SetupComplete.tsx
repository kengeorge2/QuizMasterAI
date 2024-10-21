import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const SetupComplete: React.FC = () => {
  const location = useLocation();
  const { accountType, organizationName } = location.state || {};

  return (
    <div className="w-full max-w-md text-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Setup Complete!</h2>
        <p className="mb-4">
          {accountType === 'organization'
            ? `Your organization "${organizationName}" has been successfully registered.`
            : 'Your account has been successfully created.'}
        </p>
        <p className="mb-4">
          {accountType === 'organization'
            ? 'You can now set up teacher accounts and manage your organization.'
            : 'You can now start using the Quiz AI Generator.'}
        </p>
        <Link
          to="/dashboard"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline inline-block"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default SetupComplete;