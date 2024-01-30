import { TicketType } from '../types/types';
import { colors } from '../util/colors';

function getRandomColorNumber() {
  return Math.floor(Math.random() * colors.length);
}

async function getTickets() {
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
    <section className='p-3 flex flex-col gap-2'>
      {tickets.map((ticket: TicketType) => {
        const randomColorIndex = getRandomColorNumber();

        return (
          <div
            key={ticket.id}
            className='flex items-center justify-between bg-white py-3 px-2'
          >
            {/* LEFT COLUMN */}
            <div className='w-4/5 flex gap-4 ml-4'>
              <div
                style={{ backgroundColor: colors[randomColorIndex] }}
                className={`w-11 h-11 flex justify-center items-center rounded-lg opacity-50`}
              >
                {ticket.user.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <h2>{ticket.title}</h2>
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
    </section>
  );
}
