import prisma from '@/lib/prisma/prisma';

interface GetEventByIdParams {
  id: string;
  userId: string;
}

export const getEventById = async ({ id, userId }: GetEventByIdParams) => {
  return prisma.event.findFirst({
    where: { id, userId },
  });
};
