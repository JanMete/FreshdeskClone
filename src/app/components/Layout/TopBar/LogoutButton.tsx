'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClientComponentClient<Database>();
    const { error } = await supabase.auth.signOut();

    if (!error) {
      router.push('/login');
    }
    if (error) {
      console.log(error);
    }
  };
  return (
    <button
      onClick={handleLogout}
      className='px-4 py-1 bg-logoutBtn hover:bg-logoutHoverBtn border border-[#cfd7df] text-black rounded-md'
    >
      Logout
    </button>
  );
}
