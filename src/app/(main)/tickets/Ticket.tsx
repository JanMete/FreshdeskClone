import React from 'react';
import { colorMapping } from '@/app/lib/utils';
import Link from 'next/link';

type Tticket = {
  ticket: ticket;
};

export default function Ticket({ ticket }: Tticket) {
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
          {ticket.user_email!.slice(0, 1).toUpperCase()}
        </div>
        <div>
          <Link href={`/tickets/${ticket.id}`}>
            <h2>{ticket.title}</h2>
          </Link>
          <div>
            <p>{ticket.user_email}</p>
          </div>
        </div>
      </div>
      {/* RIGHT COLUMN */}
      <div className='w-1/5'>
        <div className='flex items-center'>
          <div
            className={`w-3 h-3 rounded-sm ${
              colorMapping[ticket.priority!]
            } mr-2`}
          ></div>
          <div>{ticket.priority}</div>
        </div>
        {/* SECTION */}
        <div className='flex items-center'>
          <div className='mr-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='12'
              height='12'
              viewBox='0 0 32 32'
            >
              <path d='M23.922 23.085h2.638a1.203 1.203 0 110 2.406h-2.638v2.638a1.203 1.203 0 11-2.406 0v-2.638h-2.638a1.203 1.203 0 110-2.406h2.638v-2.638a1.203 1.203 0 112.406 0v2.638zm-8.209-5.961c-3.822 0-6.92-3.117-6.92-6.962S11.891 3.2 15.713 3.2s6.92 3.117 6.92 6.962-3.098 6.962-6.92 6.962zm0-2.421c2.492 0 4.513-2.033 4.513-4.541s-2.02-4.541-4.513-4.541c-2.492 0-4.513 2.033-4.513 4.541s2.02 4.541 4.513 4.541zm-9.04 12.612c0 .669-.539 1.211-1.203 1.211s-1.203-.542-1.203-1.211c0-4.589 3.924-8.274 8.725-8.274h5.014c.665 0 1.203.542 1.203 1.211s-.539 1.211-1.203 1.211h-5.014c-3.507 0-6.318 2.64-6.318 5.852z'></path>
            </svg>
          </div>
          <div>{ticket.agent}</div>
        </div>
        {/* SECTION */}
        <div className='flex items-center'>
          <div className='mr-2'>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='12'
                height='12'
                viewBox='0 0 32 32'
              >
                <path d='M19.167 26.693a1.168 1.168 0 002.173.019l3.854-9.248h4.963c.65 0 1.176-.536 1.176-1.197s-.527-1.197-1.176-1.197h-5.742c-.472 0-.898.287-1.083.73l-3.049 7.316-6.856-17.275a1.168 1.168 0 00-2.149-.074L6.847 15.07H1.842c-.65 0-1.176.536-1.176 1.197s.527 1.197 1.176 1.197h5.742c.451 0 .862-.262 1.058-.675l3.596-7.55 6.927 17.454z'></path>
              </svg>
            </div>
          </div>
          <div>{ticket.status}</div>
        </div>
      </div>
    </div>
  );
}
