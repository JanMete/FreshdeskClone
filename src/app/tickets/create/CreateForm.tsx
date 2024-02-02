'use client';

import React from 'react';
import styles from './createForm.module.css';
import Link from 'next/link';
import { FieldValues, useForm } from 'react-hook-form';

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
    setError,
  } = useForm<TCreateTicketSchema>({
    resolver: zodResolver(createTicketSchema),
  });

  const onSubmit = async (data: TCreateTicketSchema) => {
    console.log(data);

    // const res = fetch('http://localhost:4000/tickets', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'Application/json' },
    //   body: JSON.stringify(data),
    // });

    // if ((await res).status === 201) {
    //   router.refresh();
    //   router.push('/tickets');
    // }

    reset();

    // const response = await fetch('/apki/createticket', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    //   headers: { 'Content-Type': 'application/json' },
    // });

    // const responseData = await response.json();
    // if (!response.ok) {
    //   alert('Submitting ticket failed!');
    //   return;
    // }

    // if (responseData.errors) {
    //   const errors = responseData.errors;
    //   if (errors.title) {
    //     setError('title', {
    //       type: 'server',
    //       message: errors.title,
    //     });
    //   } else if (errors.priority) {
    //     setError('priority', {
    //       type: 'server',
    //       message: errors.priority,
    //     });
    //   } else if (errors.body) {
    //     setError('body', {
    //       type: 'server',
    //       message: errors.body,
    //     });
    //   } else {
    //     alert('Something went wrong!');
    //   }
    // }
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
        {/* HIDDEN */}
        <input type='hidden' defaultValue={'open'} {...register('status')} />
        <input type='hidden' defaultValue={'unknown'} {...register('user')} />
        <input
          type='hidden'
          defaultValue={'unknown@gmail.com'}
          {...register('user_email')}
        />
        <input
          type='hidden'
          defaultValue={'unassigned'}
          {...register('agent')}
        />
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
