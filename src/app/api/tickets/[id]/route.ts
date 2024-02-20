import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

type idType = {
  params: {
    id: string;
  };
};

export async function DELETE(_: any, { params }: idType) {
  const id = params.id;
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const { error } = await supabase.from('Tickets').delete().eq('id', id);

  return NextResponse.json({ error });
}

export async function PATCH(request: Request, { params }: idType) {
  const id = params.id;
  const ticket = await request.json();

  const supabase = createRouteHandlerClient<Database>({ cookies });

  const { data, error } = await supabase
    .from('Tickets')
    .update({ ...ticket })
    .eq('id', id);

  return NextResponse.json({ data, error });
}
