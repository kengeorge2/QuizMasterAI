export interface User {
  id: string;
  email: string;
  displayName?: string;
  avatar?: string;
  role: 'admin' | 'teacher' | 'student';
  organizationId?: string;
}

export interface Organization {
  id: string;
  name: string;
  logo?: string;
}

export interface SignupData {
  email: string;
  password: string;
  accountType: 'individual' | 'organization';
  organizationName?: string;
  role: 'admin' | 'teacher' | 'student';
}

export interface ValidationError {
  field: string;
  message: string;
}