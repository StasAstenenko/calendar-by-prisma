'use client';

import { useState, useEffect } from 'react';
import { Event } from '@/types/event';

interface EventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date | null;
  event: Event | null;
  onSave: (data: Omit<Event, 'id'>) => void;
  userId: string;
}

const EventFormModal = ({
  isOpen,
  onClose,
  date,
  event,
  onSave,
  userId,
}: EventFormModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [importance, setImportance] = useState<'low' | 'medium' | 'high'>(
    'medium'
  );

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description || '');
      setImportance(event.importance as 'low' | 'medium' | 'high');
    } else {
      setTitle('');
      setDescription('');
      setImportance('medium');
    }
  }, [event]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/50 flex justify-center items-center z-[99999999]'>
      <div className='bg-white p-6 rounded shadow-lg space-y-4 w-[400px]'>
        <h2 className='text-xl font-bold'>
          {event ? 'Редагувати подію' : 'Нова подія'}
        </h2>

        {/* Назва */}
        <input
          type='text'
          placeholder='Назва'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='border p-2 rounded w-full'
        />

        {/* Опис */}
        <textarea
          placeholder='Опис'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='border p-2 rounded w-full resize-none'
          rows={3}
        />

        {/* Ступінь важливості */}
        <select
          value={importance}
          onChange={(e) =>
            setImportance(e.target.value as 'low' | 'medium' | 'high')
          }
          className='border p-2 rounded w-full'
        >
          <option value='low'>Низька</option>
          <option value='medium'>Середня</option>
          <option value='high'>Висока</option>
        </select>

        {/* Кнопки */}
        <div className='flex justify-end space-x-2'>
          <button onClick={onClose} className='text-gray-500'>
            Скасувати
          </button>
          <button
            onClick={() =>
              onSave({
                title,
                start: date?.toISOString() || new Date().toISOString(),
                end: date?.toISOString() || new Date().toISOString(),
                description,
                importance,
                userId,
              })
            }
            className='bg-blue-500 text-white px-4 py-2 rounded'
          >
            Зберегти
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventFormModal;
