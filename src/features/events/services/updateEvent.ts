import prisma from '@/lib/prisma/prisma';
import { CreateEventInput } from '../types/eventTypes';
import { Importance } from '@prisma/client';

interface UpdateEventParams {
  id: string;
  userId: string;
  data: Partial<CreateEventInput>;
}

export const updateEvent = async ({ id, userId, data }: UpdateEventParams) => {
  const prismaData = {
    ...data,
    importance: data.importance
      ? (data.importance.toUpperCase() as Importance)
      : undefined,
  };

  return prisma.event.updateMany({
    where: { id, userId },
    data: prismaData,
  });
};
