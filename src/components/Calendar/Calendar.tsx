'use client';

import { Event } from '@/types/event';
import {
  Calendar as BigCalendar,
  dayjsLocalizer,
  View,
} from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';

const localizer = dayjsLocalizer(dayjs);

interface CalendarProps {
  events: Event[];
  onDateClick: (date: Date) => void;
  onEdit: (event: Event) => void;
}

const Calendar = ({ events, onDateClick, onEdit }: CalendarProps) => {
  const [view, setView] = useState<View>('month');

  const mappedEvents = events.map((event) => ({
    id: event.id,
    title: event.title,
    start: new Date(event.start),
    end: new Date(event.end),
    allDay: true,
  }));

  return (
    <div className='border rounded p-4'>
      <BigCalendar
        localizer={localizer}
        events={mappedEvents}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 500 }}
        view={view}
        onView={(newView) => setView(newView)}
        selectable
        onSelectSlot={(slotInfo) => {
          onDateClick(slotInfo.start);
        }}
        onSelectEvent={(event) => {
          const found = events.find((e) => e.id === event.id);
          if (found) onEdit(found);
        }}
        messages={{
          next: 'Наступний',
          previous: 'Попередній',
          today: 'Сьогодні',
          month: 'Місяць',
          week: 'Тиждень',
          day: 'День',
          agenda: 'Порядок денний',
        }}
      />
    </div>
  );
};

export default Calendar;
