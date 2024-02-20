'use client';

import React from 'react';
import styles from './createForm.module.css';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  TCreateTicketSchema,
  createTicketSchema,
} from '@/app/lib/schema/schema';
import { useRouter } from 'next/navigation';

export default function CreateForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TCreateTicketSchema>({
    resolver: zodResolver(createTicketSchema),
  });

  const onSubmit = async (data: TCreateTicketSchema) => {
    const res = await fetch(`${location.origin}/api/tickets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (json.error) {
      console.log(json.error);
    }
    if (json.data) {
      router.push('/tickets');
      router.refresh();
    }

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='py-10 flex flex-col justify-center items-center'
    >
      <div className='w-4/5 flex flex-col gap-6'>
        {/* SUBJECT */}
        <div className={styles.inputContainer}>
          <label>Subject</label>
          <input type='text' {...register('title')} />
          {errors.title && (
            <p className='text-red-500 text-sm'>{`${errors.title.message}`}</p>
          )}
        </div>
        {/* PRIORITY */}
        <div className={styles.inputContainer}>
          <label>Priority</label>
          <select defaultValue={'low'} {...register('priority')}>
            <option value='low'>Low</option>
            <option value='medium'>Medium</option>
            <option value='high'>High</option>
            <option value='urgent'>Urgent</option>
          </select>
        </div>
        {/* DESCRIPTION */}
        <div className={styles.inputContainer}>
          <label>Description</label>
          <textarea className='min-h-60' {...register('body')}></textarea>
          {errors.body && (
            <p className='text-red-500 text-sm'>{`${errors.body.message}`}</p>
          )}
        </div>
        {/* BUTTONS */}
        <div className='flex justify-end gap-4'>
          <Link href={'/tickets'}>
            <button className='px-4 py-1 bg-[#f3f5f7] text-black rounded-md border-[1px] border-[#dadfe3]'>
              Cancel
            </button>
          </Link>
          <button
            disabled={isSubmitting}
            className='px-4 py-1 bg-gradientBtn hover:bg-gradientHoverBtn text-white rounded-md disabled:bg-disabledGradientBtn disabled:cursor-not-allowed'
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
