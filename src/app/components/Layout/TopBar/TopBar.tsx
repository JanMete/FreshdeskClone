import Link from 'next/link';
import Title from './Title';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import LogoutButton from './LogoutButton';
import { redirect } from 'next/navigation';

export default async function TopBar() {
  const superbase = createServerComponentClient<Database>({ cookies });
  const { data } = await superbase.auth.getSession();

  if (!data.session) {
    redirect('/login');
  }

  return (
    <header className='p-10 bg-white flex justify-between'>
      <Title />
      <div className='flex gap-3 items-center'>
        <h3>Logged in as {data.session?.user.email}</h3>
        <LogoutButton />
      </div>
      <Link href={'/tickets/create'}>
        <button className='px-4 py-1 bg-gradientBtn hover:bg-gradientHoverBtn text-white rounded-md'>
          Create
        </button>
      </Link>
    </header>
  );
}
