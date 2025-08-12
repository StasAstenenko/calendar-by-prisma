import prisma from '@/lib/prisma/prisma';
import { CreateEventInput } from '../types/eventTypes';

interface UpdateEventParams {
  id: string;
  userId: string;
  data: Partial<CreateEventInput>;
}

export const updateEvent = async ({ id, userId, data }: UpdateEventParams) => {
  return prisma.event.updateMany({
    where: { id, userId },
    data,
  });
};
