'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AuthTopBar() {
  const pathname = usePathname();

  return (
    <header className='p-10 bg-white'>
      <nav className='flex gap-11'>
        <Link
          className={pathname === '/login' ? 'underline' : ''}
          href={'/login'}
        >
          LogIn
        </Link>
        <Link
          className={pathname === '/signup' ? 'underline' : ''}
          href={'/signup'}
        >
          SignUp
        </Link>
      </nav>
    </header>
  );
}
