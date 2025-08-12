import prisma from '@/lib/prisma/prisma';

interface DeleteEventParams {
  id: string;
  userId: string;
}

export const deleteEvent = async ({ id, userId }: DeleteEventParams) => {
  return prisma.event.deleteMany({
    where: { id, userId },
  });
};
