import type { Event as AppEvent, EventImportance } from '@/types/event';
import prisma from '../prisma/prisma';

export const fetchEvents = async (userId?: string): Promise<AppEvent[]> => {
  if (!userId) return [];

  try {
    const events = await prisma.event.findMany({
      where: { userId },
      orderBy: { start: 'asc' },
    });

    return events.map((event) => ({
      id: event.id,
      title: event.title,
      start: event.start.toISOString(),
      end: event.end.toISOString(),
      description: event.description ?? '',
      importance: event.importance
        ? (event.importance.toLowerCase() as EventImportance)
        : undefined,
      userId: event.userId,
    }));
  } catch (error) {
    console.error('fetchEvents error:', error);
    throw error;
  }
};
