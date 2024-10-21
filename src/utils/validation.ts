import { SignupData, ValidationError } from '../types/user';

export const validateEmail = (email: string): ValidationError | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { field: 'email', message: 'Invalid email address' };
  }
  return null;
};

export const validatePassword = (password: string): ValidationError | null => {
  if (password.length < 8) {
    return { field: 'password', message: 'Password must be at least 8 characters long' };
  }
  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
    return { field: 'password', message: 'Password must contain uppercase, lowercase, and numeric characters' };
  }
  return null;
};

export const validateSignupData = (data: SignupData): ValidationError[] => {
  const errors: ValidationError[] = [];

  const emailError = validateEmail(data.email);
  if (emailError) errors.push(emailError);

  const passwordError = validatePassword(data.password);
  if (passwordError) errors.push(passwordError);

  if (data.accountType === 'organization' && (!data.organizationName || data.organizationName.trim() === '')) {
    errors.push({ field: 'organizationName', message: 'Organization name is required' });
  }

  if (!['admin', 'teacher', 'student'].includes(data.role)) {
    errors.push({ field: 'role', message: 'Invalid role selected' });
  }

  return errors;
};

export const validateVerificationCode = (code: string): ValidationError | null => {
  if (code.length !== 6 || !/^\d+$/.test(code)) {
    return { field: 'verificationCode', message: 'Verification code must be 6 digits' };
  }
  return null;
};