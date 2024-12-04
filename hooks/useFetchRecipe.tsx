import { useState } from 'react';

const useFetch = (baseURL: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = async (endpoint: string, method: string, body?: any) => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No token found in localStorage');
    }

    try {
      const response = await fetch(`${baseURL}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '', 
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'An error occurred');
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (err: any) {
      console.error('Request error:', err.message); 
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const get = (endpoint: string) => request(endpoint, 'GET');
  const post = (endpoint: string, body: any) => request(endpoint, 'POST', body);
  const put = (endpoint: string, body: any) => request(endpoint, 'PUT', body);
  const del = (endpoint: string) => request(endpoint, 'DELETE');

  return { get, post, put, del, data, loading, error };
};

export default useFetch;
