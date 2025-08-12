import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/prisma/prisma';
import { credentialsProvider } from './providers/credentialsProvider';
import { jwtCallback } from './callbacks/jwtCallback';
import { sessionCallback } from './callbacks/sessionCallback';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers: [credentialsProvider],
  callbacks: {
    jwt: jwtCallback,
    session: sessionCallback,
  },
  secret: process.env.AUTH_SECRET,
};
