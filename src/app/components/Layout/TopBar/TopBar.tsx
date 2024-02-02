import Link from 'next/link';
import Title from './Title';

export default function TopBar() {
  return (
    <header className='p-10 bg-white flex justify-between'>
      <Title />
      <Link href={'/tickets/create'}>
        <button className='px-4 py-1 bg-gradientBtn hover:bg-gradientHoverBtn text-white rounded-md'>
          Create
        </button>
      </Link>
    </header>
  );
}
