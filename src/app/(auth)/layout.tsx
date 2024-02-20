import { redirect } from 'next/navigation';
import AuthTopBar from './AuthTopBar';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const superbase = createServerComponentClient<Database>({ cookies });
  const { data } = await superbase.auth.getSession();

  if (data.session) {
    redirect('/');
  }
  return (
    <>
      <AuthTopBar />
      {children}
    </>
  );
}
