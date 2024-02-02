'use client';
import { usePathname } from 'next/navigation';

export default function Title() {
  const pathname = usePathname();
  return <h1>{pathname === '/' ? 'My dashboard' : 'Tickets'}</h1>;
}
