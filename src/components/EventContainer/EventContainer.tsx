'use client';

import { useState, useMemo } from 'react';
import Calendar from '@/components/Calendar/Calendar';
import EventList from '@/components/EventList/EventList';
import EventFormModal from '@/components/EventFormModal/EventFormModal';
import { useEvents } from '@/hooks/useEvents';
import { Event } from '@/types/event';
import SearchBar from '../SearchBar/SearchBar';
import ImportanceFilter from '../ImportanceFilter/ImportanceFilter';

interface EventsContainerProps {
  initialEvents: Event[];
  userId: string;
}

const EventsContainer = ({ initialEvents, userId }: EventsContainerProps) => {
  const { events, loading, createEvent, updateEvent, deleteEvent } =
    useEvents(initialEvents);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [importanceFilter, setImportanceFilter] = useState('');

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch = event.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesImportance = importanceFilter
        ? event.importance === importanceFilter.toUpperCase()
        : true;

      return matchesSearch && matchesImportance;
    });
  }, [events, searchTerm, importanceFilter]);

  return (
    <div className='p-6 space-y-4'>
      <h1 className='text-2xl font-bold'>Мої події</h1>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <ImportanceFilter
          importance={importanceFilter}
          onImportanceChange={setImportanceFilter}
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Calendar
          events={filteredEvents}
          onDateClick={handleDateClick}
          onEdit={handleEdit}
        />
        <EventList
          events={filteredEvents}
          onEdit={handleEdit}
          onDelete={deleteEvent}
          loading={loading}
        />
      </div>

      <EventFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        date={selectedDate}
        event={editingEvent}
        userId={userId}
        onSave={(data) => {
          if (editingEvent) {
            updateEvent(editingEvent.id, data);
          } else {
            createEvent({
              ...data,
              userId,
              start: selectedDate?.toISOString() || new Date().toISOString(),
              end: selectedDate?.toISOString() || new Date().toISOString(),
            });
          }
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default EventsContainer;
