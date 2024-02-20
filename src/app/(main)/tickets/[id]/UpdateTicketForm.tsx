'use client';

import styles from './id.module.css';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TUpdateTicket, updateTicket } from '@/app/lib/schema/schema';
import { useRouter } from 'next/navigation';

export default function UpdateTicketForm({
  ticket,
  id,
  users,
}: {
  ticket: ticket;
  id: string;
  users: (string | null)[];
}) {
  const router = useRouter();

  const [isFormChanged, setIsFormChanged] = useState(false);

  const onSubmit = async (data: TUpdateTicket) => {
    setIsFormChanged(false);
    const res = await fetch(`${location.origin}/api/tickets/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (json.error) {
      console.log(json.error);
    }
    if (json.data) {
      console.log(json.data);
    }
    router.refresh();
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TUpdateTicket>({
    resolver: zodResolver(updateTicket),
  });

  const handleSelectChange = () => {
    setIsFormChanged(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.selectContainer}>
        <label>Status</label>
        <select
          defaultValue={ticket.status ?? ('' as string)}
          {...register('status')}
          onChange={handleSelectChange}
        >
          <option value='open'>Open</option>
          <option value='pending'>Pending</option>
          <option value='resolved'>Resolved</option>
          <option value='waiting for customer response'>
            Waiting for customer response
          </option>
        </select>
      </div>
      <div className={styles.selectContainer}>
        <label>Priority</label>
        <select
          defaultValue={ticket.priority ?? ('' as string)}
          {...register('priority')}
          onChange={handleSelectChange}
        >
          <option value='low'>Low</option>
          <option value='medium'>Medium</option>
          <option value='high'>High</option>
          <option value='urgent'>Urgent</option>
        </select>
      </div>
      <div className={styles.selectContainer}>
        <label>Agent</label>
        <select
          defaultValue={ticket.agent ?? ('' as string)}
          {...register('agent')}
          onChange={handleSelectChange}
        >
          {users.map((user) => {
            return (
              <option key={user} value={user as string}>
                {user}
              </option>
            );
          })}
        </select>
      </div>
      <button
        disabled={!isFormChanged || isSubmitting}
        className='w-full py-1 px-2 rounded-md text-white bg-gradientBtn hover:bg-gradientHoverBtn disabled:bg-disabledGradientBtn disabled:cursor-not-allowe'
      >
        Apply
      </button>
    </form>
  );
}
