export type EventImportance = 'low' | 'medium' | 'high';

export interface Event {
  id: string;
  title: string;
  description?: string;
  start: string;
  end: string;
  importance?: EventImportance;
  userId: string;
}
