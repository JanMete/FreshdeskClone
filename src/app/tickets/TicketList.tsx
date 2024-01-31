import Link from 'next/link';
import { TicketType } from '../types/types';

async function getTickets() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const res = await fetch('http://localhost:4000/tickets', {
    next: {
      revalidate: 0,
    },
  });
  return res.json();
}

export default async function TicketList() {
  const tickets = await getTickets();

  return (
    <main className='p-3 flex flex-col gap-2'>
      {tickets.map((ticket: TicketType) => {
        return (
          <div
            key={ticket.id}
            className='flex items-center justify-between bg-white py-3 px-2'
          >
            {/* LEFT COLUMN */}
            <div className='w-4/5 flex gap-4 ml-4'>
              <div
                className={`w-11 h-11 flex justify-center items-center rounded-lg opacity-50 bg-yellow-200`}
              >
                {ticket.user.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <Link href={`/tickets/${ticket.id}`}>
                  <h2>{ticket.title}</h2>
                </Link>
                <div>
                  <p>{ticket.user}</p>
                </div>
              </div>
            </div>
            {/* RIGHT COLUMN */}
            <div className='w-1/5'>
              <div>{ticket.priority}</div>
              <div>{ticket.agent}</div>
              <div>{ticket.status}</div>
            </div>
          </div>
        );
      })}
      {tickets.length === 0 && <p>There is no tickets left.</p>}
    </main>
  );
}
