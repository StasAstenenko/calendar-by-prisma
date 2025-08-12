import prisma from '@/lib/prisma/prisma';
import { CreateEventInput } from '../types/eventTypes';
import { Importance } from '@prisma/client'; // <-- Prisma enum

interface CreateEvent {
  userId: string;
  data: CreateEventInput;
}

export const createEvent = async ({ userId, data }: CreateEvent) => {
  try {
    const startDate = new Date(data.start);
    const endDate = new Date(data.end);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error('Invalid start or end date');
    }

    if (endDate < startDate) {
      throw new Error('End date must be after start date');
    }

    return await prisma.event.create({
      data: {
        title: data.title,
        description: data.description ?? '',
        start: startDate,
        end: endDate,
        importance: data.importance
          ? (data.importance.toUpperCase() as Importance)
          : Importance.LOW,
        userId,
      },
    });
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};
