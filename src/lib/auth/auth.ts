import { authOptions } from '@/features/auth/authOptions';
import { getServerSession } from 'next-auth';

export const getAuthSession = async () => {
  return await getServerSession(authOptions);
};
