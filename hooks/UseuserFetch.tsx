import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';  // import AsyncStorage

type UserResponse = any;

const useUserFetch = () => {
  const [error, setError] = useState<string>('');

  const getFetch = async (url: string, options: RequestInit) => {
    try {
    
      const token = await AsyncStorage.getItem('userToken');

      const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      };

      const response = await fetch(url, {
        ...options,
        headers: { ...headers, ...options.headers }, 
      });

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
      body: JSON.stringify(userData),
    });
  };

  const login = async (email: string, password: string) => {
    return getFetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  };

  return { register, login, error };
};

export default useUserFetch;
