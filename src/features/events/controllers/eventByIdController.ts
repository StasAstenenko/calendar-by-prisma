import { NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth/auth';
import { getEventById } from '../services/getEventById';
import { updateEvent } from '../services/updateEvent';
import { deleteEvent } from '../services/deleteEvent';
import { CreateEventInput } from '../types/eventTypes';

type Params = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Params) {
  const { id } = await params; // ← чекаємо Promise
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const event = await getEventById({ id, userId: session.user.id });
  if (!event) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(event);
}

export async function PUT(req: Request, { params }: Params) {
  const { id } = await params;
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data: Partial<CreateEventInput> = await req.json();
  const updated = await updateEvent({
    id,
    userId: session.user.id,
    data,
  });

  if (!updated.count) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params;
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const deleted = await deleteEvent({ id, userId: session.user.id });
  if (!deleted.count) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
