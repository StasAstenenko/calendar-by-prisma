import prisma from '@/lib/prisma/prisma';
import { CreateEventInput } from '../types/eventTypes';
import { Importance } from '@prisma/client';
import { EventImportance } from '@/types/event';

interface CreateEvent {
  userId: string;
  data: CreateEventInput;
}

const importanceMap: Record<EventImportance, Importance> = {
  low: Importance.LOW,
  medium: Importance.MEDIUM,
  high: Importance.CRITICAL,
};

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
        importance: importanceMap[data.importance as EventImportance],
        userId,
      },
    });
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};
