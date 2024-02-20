import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import Ticket from './Ticket';

async function getTickets() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase.from('Tickets').select();

  if (error) {
    console.log(error.message);
  }
  return data || [];
}

export default async function TicketList() {
  const tickets = await getTickets();

  return (
    <main className='p-3 flex flex-col gap-2'>
      {tickets.map((ticket: ticket) => {
        return <Ticket key={ticket.id} ticket={ticket} />;
      })}
      {tickets.length === 0 && <p>There is no tickets left.</p>}
    </main>
  );
}
