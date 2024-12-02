import { useState } from 'react';

type UserResponse = any;

const useUserFetch = () => {
  const [error, setError] = useState<string>('');

  const getFetch = async (url: string, options: RequestInit) => {
    try {
      const response = await fetch(url, options);
      const data: UserResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return { status: response.ok, data };
    } catch (err: any) {
      setError(err.message);
      return { status: false, data: null };
    }
  };

  const register = async (userData: { username: string; email: string; password: string }) => {
    return getFetch('http://localhost:5000/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
  };

  const login = async (email: string, password: string) => {
    return getFetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  };

  return { register, login, error };
};

export default useUserFetch;
