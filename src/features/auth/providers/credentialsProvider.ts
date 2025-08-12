import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma/prisma';

interface User {
  id: string;
  name: string | null;
  email: string;
  password: string;
}

export const credentialsProvider = CredentialsProvider({
  name: 'credentials',
  credentials: {
    email: { label: 'Email', type: 'email' },
    password: { label: 'Password', type: 'password' },
  },
  async authorize(credentials) {
    if (!credentials?.email || !credentials?.password) return null;

    const user: User | null = await prisma.user.findUnique({
      where: { email: credentials.email },
    });
    if (!user) return null;

    const isValid = await bcrypt.compare(credentials.password, user.password);
    if (!isValid) return null;

    return { id: user.id, email: user.email, name: user.name };
  },
});
