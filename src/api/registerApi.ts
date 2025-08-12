import { CreateUserResult } from '@/types/authTypes';
import axios from 'axios';
import { signIn } from 'next-auth/react';

export const createUser = async (
  email: string,
  password: string
): Promise<CreateUserResult> => {
  try {
    await axios.post('/api/auth/register', { email, password });

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (!res) {
      throw new Error('No response from signIn');
    }

    return res;
  } catch (error) {
    return error instanceof Error ? error : new Error('Unknown error');
  }
};
