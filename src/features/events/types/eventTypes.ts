import { EventImportance } from '@/types/event';

export interface CreateEventInput {
  title: string;
  description?: string;
  start: string | Date;
  end: string | Date;
  importance?: EventImportance;
}
