import React from 'react';
import TicketList from './TicketList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Freshdesk | Tickets',
};

export default function Tickets() {
  return <TicketList />;
}
