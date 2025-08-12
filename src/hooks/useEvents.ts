import { useState, useEffect } from 'react';
import axios from 'axios';
import { Event } from '@/types/event';

export const useEvents = (initialEvents: Event[] = []) => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<Event[]>('/api/events');
      setEvents(data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (newEvent: Omit<Event, 'id'>) => {
    try {
      await axios.post('/api/events', newEvent);
      await fetchEvents();
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  const updateEvent = async (id: string, updatedEvent: Partial<Event>) => {
    try {
      await axios.put(`/api/events/${id}`, updatedEvent);
      await fetchEvents();
    } catch (error) {
      console.error('Failed to update event:', error);
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      await axios.delete(`/api/events/${id}`);
      await fetchEvents();
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return { events, loading, createEvent, updateEvent, deleteEvent };
};
