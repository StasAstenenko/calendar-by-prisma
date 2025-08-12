import { NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth/auth';
import { getEventById } from '../services/getEventById';
import { updateEvent } from '../services/updateEvent';
import { deleteEvent } from '../services/deleteEvent';
import { CreateEventInput } from '../types/eventTypes';

export const GET = async (
  _: Request,
  { params }: { params: { id: string } }
) => {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const event = await getEventById({ id: params.id, userId: session.user.id });
  if (!event) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(event);
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data: Partial<CreateEventInput> = await req.json();
  const updated = await updateEvent({
    id: params.id,
    userId: session.user.id,
    data,
  });

  if (!updated.count) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
};

export const DELETE = async (
  _: Request,
  { params }: { params: { id: string } }
) => {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const deleted = await deleteEvent({ id: params.id, userId: session.user.id });
  if (!deleted.count) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
};
