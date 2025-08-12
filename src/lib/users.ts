'use server';

import prisma from './prisma/prisma';

export const getUsers = async () => {
  const users = prisma.user.findMany();

  return users;
};
