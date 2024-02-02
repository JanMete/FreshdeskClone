import { TicketType } from '@/app/lib/types/types';
import styles from './id.module.css';
import { notFound } from 'next/navigation';

type TicketDetailsProps = {
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
  const res = await fetch('http://localhost:4000/tickets');

  const tickets = await res.json();

  return tickets.map((ticket: TicketType) => ({
    id: ticket.id,
  }));
}

async function getTicket(id: string) {
  const res = await fetch(`http://localhost:4000/tickets/${id}`, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    notFound();
  }
  return res.json();
}

function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export default async function TicketDetails({ params }: TicketDetailsProps) {
  const id = params.id;
  const ticket = await getTicket(id);
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
            {ticket.user.slice(0, 1).toUpperCase()}
          </div>
          <h3>{ticket.user}</h3>
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
      <section className='w-1/5 m-5 p-8 bg-white shadow-sm'>
        <p>{capitalizeFirstLetter(ticket.status)}</p>
        <hr className='my-3' />
        <p className='text-xs'>PROPERTIES</p>
        <div className={styles.selectContainer}>
          <label>Status</label>
          <select defaultValue={ticket.status} name='status'>
            <option value='open'>Open</option>
            <option value='pending'>Pending</option>
            <option value='resolved'>Resolved</option>
            <option value='waiting for customer response'>
              Waiting for customer response
            </option>
          </select>
        </div>
        <div className={styles.selectContainer}>
          <label>Priority</label>
          <select defaultValue={ticket.priority} name='priority'>
            <option value='low'>Low</option>
            <option value='medium'>Medium</option>
            <option value='high'>High</option>
            <option value='urgent'>Urgent</option>
          </select>
        </div>
        <div className={styles.selectContainer}>
          <label>Agent</label>
          <select defaultValue={ticket.agent} name='agent'>
            <option value='unassigned'>Unassigned</option>
          </select>
        </div>
        <button className='w-full py-1 px-2 rounded-md text-white bg-gradientBtn hover:bg-gradientHoverBtn'>
          Apply
        </button>
      </section>
    </main>
  );
}
