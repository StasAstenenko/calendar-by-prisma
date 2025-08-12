import { getServerSession } from 'next-auth';
import EventsContainer from '@/components/EventContainer/EventContainer';
import { fetchEvents } from '@/lib/events/fetchEvents';
import { authOptions } from '@/features/auth/authOptions';

export default async function EventsPage() {
  const session = await getServerSession(authOptions);
  const events = await fetchEvents(session?.user?.id);

  if (!session?.user.id) return;
  return <EventsContainer initialEvents={events} userId={session?.user.id} />;
}
