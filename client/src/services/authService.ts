import api from './api';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
  verified?: boolean;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

/**
 * Register new user
 */
export const register = async (
  name: string,
  email: string,
  password: string,
  role?: string
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', {
    name,
    email,
    password,
    role,
  });
  return response.data;
};

/**
 * Login user
 */
export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', {
    email,
    password,
  });
  return response.data;
};

/**
 * Get current user
 */
export const getCurrentUser = async (): Promise<{ user: User }> => {
  const response = await api.get<{ user: User }>('/auth/me');
  return response.data;
};


