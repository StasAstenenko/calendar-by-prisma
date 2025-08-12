import { NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth/auth';
import { getEvents } from '../services/getEvents';
import { createEvent } from '../services/createEvent';
import { CreateEventInput } from '../types/eventTypes';
import { Importance } from '@prisma/client';

export const GET = async (req: Request) => {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') ?? undefined;

  const importanceParam = searchParams.get('importance') ?? undefined;
  const importance =
    importanceParam && importanceParam in Importance
      ? (importanceParam as Importance)
      : undefined;

  const events = await getEvents({ userId: session.user.id, q, importance });
  return NextResponse.json(events);
};

export const POST = async (req: Request) => {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body: CreateEventInput = await req.json();
  const event = await createEvent({ userId: session.user.id, data: body });
  return NextResponse.json(event);
};
