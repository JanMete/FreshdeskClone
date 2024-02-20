/* eslint-disable react/no-unescaped-entities */
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Ticket from './tickets/Ticket';

async function getUserTickets() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: userData } = await supabase.auth.getSession();

  const userEmail = userData?.session?.user?.email ?? '';

  if (userEmail) {
    const { data, error } = await supabase
      .from('Tickets')
      .select()
      .eq('agent', userEmail);
    if (error) {
      console.log(error);
    }
    return data || [];
  }
}

export default async function Home() {
  const userTickets = (await getUserTickets()) ?? [];

  return (
    <main className='p-3 flex flex-col gap-2'>
      {userTickets.length > 0 ? (
        userTickets.map((ticket) => <Ticket key={ticket.id} ticket={ticket} />)
      ) : (
        <div className='text-center'>
          <h1>You don't have any tickets.</h1>
          <p>Go do something! ;-;</p>
        </div>
      )}
    </main>
  );
}
