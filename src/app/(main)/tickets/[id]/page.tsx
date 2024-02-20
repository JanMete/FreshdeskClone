import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import TicketRightContainer from './TicketRightContainer';

type TicketDetailsProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: TicketDetailsProps) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: ticket } = await supabase
    .from('Tickets')
    .select()
    .eq('id', params.id)
    .single();

  return {
    title: `Freshdesk | ${ticket?.title || 'Ticket not found'}`,
  };
}

async function getTicket(id: string) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase
    .from('Tickets')
    .select()
    .eq('id', id)
    .single();

  if (!data) {
    notFound();
  }

  return data;
}

export default async function TicketDetails({ params }: TicketDetailsProps) {
  const id = params.id;
  const ticket: ticket = await getTicket(id);

  return (
    <main className='flex grow'>
      {/* LEFT SECTION */}

      <section className='w-4/5 px-10 pt-5 flex flex-col gap-5'>
        {/* TITLE */}
        <div className='flex items-center gap-5'>
          <div className='min-w-9 min-h-9 flex items-center justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 32 32'
              className='w-6 h-6'
              fill='#647a8e'
            >
              <path d='M2.56 5.333h26.347c1.119 0 2.027.912 2.027 2.036v18.327a2.03 2.03 0 01-2.027 2.036H2.56a2.032 2.032 0 01-2.027-2.036V7.369A2.03 2.03 0 012.56 5.333zm.405 2.444V25.29h25.536V7.777H2.965zm4.323 3.667l8.445 5.657 8.445-5.657c.559-.374 1.314-.223 1.686.339s.222 1.32-.337 1.694l-9.12 6.109a1.21 1.21 0 01-1.349 0l-9.12-6.109c-.559-.374-.71-1.133-.337-1.694s1.128-.713 1.686-.339z'></path>
            </svg>
          </div>
          <h1 className=''>{ticket.title}</h1>
        </div>
        {/* TOP */}
        <div className='flex items-center gap-5'>
          <div
            className={`min-w-9 min-h-9 flex justify-center items-center rounded-lg opacity-50 bg-yellow-200`}
          >
            {ticket.user_email!.slice(0, 1).toUpperCase()}
          </div>
          <h3>{ticket.user_email}</h3>
        </div>
        {/* BOTTOM */}
        <div className='flex items-start gap-5'>
          <div className='min-w-9 min-h-9 pt-1 flex items-start justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 32 32'
              className='w-4 h-4'
              fill='#647a8e'
            >
              <path d='M2.56 5.333h26.347c1.119 0 2.027.912 2.027 2.036v18.327a2.03 2.03 0 01-2.027 2.036H2.56a2.032 2.032 0 01-2.027-2.036V7.369A2.03 2.03 0 012.56 5.333zm.405 2.444V25.29h25.536V7.777H2.965zm4.323 3.667l8.445 5.657 8.445-5.657c.559-.374 1.314-.223 1.686.339s.222 1.32-.337 1.694l-9.12 6.109a1.21 1.21 0 01-1.349 0l-9.12-6.109c-.559-.374-.71-1.133-.337-1.694s1.128-.713 1.686-.339z'></path>
            </svg>
          </div>
          <p>{ticket.body}</p>
        </div>
      </section>
      {/* RIGHT SECTION */}
      <TicketRightContainer id={id} ticket={ticket} />
    </main>
  );
}
