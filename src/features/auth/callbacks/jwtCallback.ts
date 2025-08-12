import { JWT } from 'next-auth/jwt';
import { User } from 'next-auth';

export const jwtCallback = async ({
  token,
  user,
}: {
  token: JWT;
  user?: User;
}) => {
  if (user) {
    token.id = user.id;
  }
  return token;
};
