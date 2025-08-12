'use client';

import { FormEvent, useState } from 'react';
import { loginUser } from '@/api/loginApi';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await loginUser(email, password);

      if ('error' in res && res.error) {
        setError(res.error);
        return;
      }
      navigate.push('/events');
    } catch {
      setError('Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-sm w-full bg-white p-6 rounded-lg shadow-md'
    >
      <h2 className='text-2xl font-semibold mb-6 text-center text-gray-800'>
        Login
      </h2>
      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={loading}
        className='w-full mb-4 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={loading}
        className='w-full mb-6 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'
      />
      <button
        type='submit'
        disabled={loading}
        className='w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && (
        <p className='mt-4 text-center text-red-600 font-medium'>{error}</p>
      )}
    </form>
  );
};

export default LoginForm;
