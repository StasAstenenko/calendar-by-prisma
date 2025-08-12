import prisma from '@/lib/prisma/prisma';
import { Importance } from '@prisma/client';

interface GetEvents {
  userId: string;
  q?: string;
  importance?: Importance;
}

export const getEvents = async ({ userId, importance, q }: GetEvents) => {
  return prisma.event.findMany({
    where: {
      userId,
      AND: [
        q
          ? {
              OR: [
                { title: { contains: q, mode: 'insensitive' } },
                { description: { contains: q, mode: 'insensitive' } },
              ],
            }
          : {},
        importance ? { importance } : {},
      ],
    },
    orderBy: { start: 'asc' },
  });
};
