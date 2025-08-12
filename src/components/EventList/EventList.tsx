'use client';

import { Event } from '@/types/event';

interface EventListProps {
  events: Event[];
  loading: boolean;
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
}

const EventList = ({ events, loading, onEdit, onDelete }: EventListProps) => {
  if (loading) return <p>Завантаження...</p>;

  return (
    <div className='border rounded p-4'>
      <h2 className='font-bold mb-2'>Список подій</h2>
      {events.length === 0 && <p>Немає подій</p>}
      {events.map((event) => (
        <div key={event.id} className='flex justify-between items-center'>
          <span>{event.title}</span>
          <span>{event.importance?.toLowerCase()}</span>
          <div className='space-x-2'>
            <button onClick={() => onEdit(event)} className='text-blue-500'>
              Редагувати
            </button>
            <button onClick={() => onDelete(event.id)} className='text-red-500'>
              Видалити
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
