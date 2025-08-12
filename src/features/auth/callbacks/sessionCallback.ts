import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

export const sessionCallback = async ({
  session,
  token,
}: {
  session: Session;
  token: JWT;
}) => {
  if (session.user) {
    session.user.id = token.id as string;
  }
  return session;
};
