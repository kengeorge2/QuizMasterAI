import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { validateVerificationCode } from '../utils/validation';
import { ValidationError } from '../types/user';

interface EmailVerificationProps {
  onVerify: (email: string, code: string, accountType: string, organizationName?: string, role?: string) => Promise<boolean>;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({ onVerify }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState<ValidationError | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { email, verificationCode: sentCode, accountType, organizationName, role } = location.state || {};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateVerificationCode(verificationCode);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const verified = await onVerify(email, verificationCode, accountType, organizationName, role);
      if (verified) {
        navigate('/setup-complete', { state: { accountType, organizationName, role } });
      } else {
        setError({ field: 'verificationCode', message: 'Invalid verification code' });
      }
    } catch (err) {
      setError({ field: 'general', message: 'An error occurred during verification. Please try again.' });
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
        <div className="mb-4">
          <p className="text-gray-700 text-sm mb-2">
            A verification code has been sent to your email. Please enter it below:
          </p>
          <p className="text-gray-500 text-xs mb-4">
            (For this demo, use this code: {sentCode})
          </p>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="verification-code"
            type="text"
            placeholder="Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 text-xs italic mb-4">{error.message}</p>}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Verify Email
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailVerification;