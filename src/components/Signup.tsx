import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Building2, Mail, Lock, ChevronRight, ChevronLeft } from 'lucide-react';
import { SignupData, ValidationError } from '../types/user';
import { validateSignupData } from '../utils/validation';

interface SignupProps {
  onSignup: (data: SignupData) => Promise<string>;
}

const Signup: React.FC<SignupProps> = ({ onSignup }) => {
  const [formData, setFormData] = useState<SignupData>({
    email: '',
    password: '',
    accountType: 'individual',
    organizationName: '',
    role: 'student',
  });
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateSignupData(formData);
    setErrors(validationErrors);

    if (validationErrors.length === 0) {
      try {
        const verificationCode = await onSignup(formData);
        navigate('/verify-email', { state: { ...formData, verificationCode } });
      } catch (error) {
        setErrors([{ field: 'general', message: 'An error occurred during signup. Please try again.' }]);
      }
    }
  };

  const renderStep1 = () => (
    <>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <div className="flex items-center border rounded">
          <Mail className="mx-2 text-gray-500" />
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <div className="flex items-center border rounded">
          <Lock className="mx-2 text-gray-500" />
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            id="password"
            name="password"
            type="password"
            placeholder="******************"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Account Type
        </label>
        <div className="flex justify-around">
          <button
            type="button"
            className={`flex items-center px-4 py-2 rounded ${
              formData.accountType === 'individual' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setFormData(prev => ({ ...prev, accountType: 'individual' }))}
          >
            <User className="mr-2" />
            Individual
          </button>
          <button
            type="button"
            className={`flex items-center px-4 py-2 rounded ${
              formData.accountType === 'organization' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setFormData(prev => ({ ...prev, accountType: 'organization' }))}
          >
            <Building2 className="mr-2" />
            Organization
          </button>
        </div>
      </div>
      {formData.accountType === 'organization' && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="organizationName">
            Organization Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="organizationName"
            name="organizationName"
            type="text"
            placeholder="Organization Name"
            value={formData.organizationName}
            onChange={handleChange}
            required
          />
        </div>
      )}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
          Role
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          {formData.accountType === 'organization' && <option value="admin">Admin</option>}
        </select>
      </div>
    </>
  );

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        {step === 1 ? renderStep1() : renderStep2()}
        {errors.map((error, index) => (
          <p key={index} className="text-red-500 text-xs italic mb-4">{error.message}</p>
        ))}
        <div className="flex items-center justify-between">
          {step > 1 && (
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
              type="button"
              onClick={() => setStep(step - 1)}
            >
              <ChevronLeft className="mr-2" size={18} />
              Previous
            </button>
          )}
          {step < 2 ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center ml-auto"
              type="button"
              onClick={() => setStep(step + 1)}
            >
              Next
              <ChevronRight className="ml-2" size={18} />
            </button>
          ) : (
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center ml-auto"
              type="submit"
            >
              Sign Up
              <ChevronRight className="ml-2" size={18} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Signup;