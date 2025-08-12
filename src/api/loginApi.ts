import { signIn } from 'next-auth/react';

export const loginUser = async (email: string, password: string) => {
  try {
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
