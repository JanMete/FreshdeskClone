import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export async function POST(request: Request) {
  const ticket = await request.json();

  const supabase = createRouteHandlerClient<Database>({ cookies });

  const authResult = await supabase.auth.getSession();

  if (!authResult.data || !authResult.data.session) {
    return NextResponse.json({
      error: 'Session not available',
    });
  }

  const { session } = authResult.data;

  const { data, error } = await supabase
    .from('Tickets')
    .insert({
      ...ticket,
      user_email: session.user.email,
    })
    .select()
    .single();

  return NextResponse.json({ data, error });
}
