import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const user = await request.json();

  const supabase = createRouteHandlerClient<Database>({ cookies });

  const { error } = await supabase.from('Users').insert({ user_email: user });

  return NextResponse.json({ error });
}
