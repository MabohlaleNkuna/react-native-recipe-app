import { useState } from 'react';

const useFetch = (baseURL: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get the token from localStorage (assuming you store it there)
  const token = localStorage.getItem('token'); 

  const request = async (endpoint: string, method: string, body?: any) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${baseURL}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',  // Add token here
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Error occurred');

      setData(result);
      return result;
    } catch (err: any) {
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
