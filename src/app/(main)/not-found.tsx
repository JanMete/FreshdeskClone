import Link from 'next/link';

/* eslint-disable react/no-unescaped-entities */
export default function NotFound() {
  return (
    <main className='flex gap-3 flex-col grow items-center justify-center'>
      <h1 className='text-3xl'>We couldn't locate the page.</h1>
      <p>It seems that we were unable to find the page you are looking for.</p>
      <p>
        Please return to the{' '}
        <Link className='underline text-blue-600' href={'/'}>
          dashboard
        </Link>
        .
      </p>
    </main>
  );
}
