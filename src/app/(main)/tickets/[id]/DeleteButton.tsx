'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function DeleteButton({ id }: { id: number }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setIsLoading(true);
    const res = await fetch(`${location.origin}/api/tickets/${id}`, {
      method: 'DELETE',
    });
    const json = await res.json();

    if (json.error) {
      console.log(json.error);
      setIsLoading(false);
    }
    if (!json.error) {
      router.push('/tickets');
      router.refresh();
    }
  };

  return (
    <button
      className='w-full py-1 px-2 rounded-md text-white bg-red-600 hover:bg-red-700 disabled:bg-red-900 disabled:cursor-not-allowe mt-4'
      disabled={isLoading}
      onClick={handleClick}
    >
      {isLoading && <p>Deleteing</p>}
      {!isLoading && <p>Delete ticket</p>}
    </button>
  );
}
