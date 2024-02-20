'use client';

import { TLogInSchema, logInSchema } from '@/app/lib/schema/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from '../auth.module.css';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function LogIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLogInSchema>({ resolver: zodResolver(logInSchema) });

  const router = useRouter();
  const [formError, setFormError] = useState('');

  const onSubmit = async (data: TLogInSchema) => {
    setFormError('');
    const supabase = createClientComponentClient<Database>();
    const { error } = await supabase.auth.signInWithPassword({
      email: data.user_email,
      password: data.password,
    });
    if (error) {
      setFormError(error.message);
    }
    if (!error) {
      router.push('/');
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='py-10 flex flex-col justify-center items-center'
    >
      <div className='w-2/12 flex flex-col gap-6'>
        {/* EMAIL */}
        <div className={styles.inputContainer}>
          <label>Email</label>
          <input type='email' {...register('user_email')} />
          {errors.user_email && (
            <p className='text-red-500 text-sm'>{`${errors.user_email.message}`}</p>
          )}
        </div>
        {/* PASSWORD */}
        <div className={styles.inputContainer}>
          <label>Password</label>
          <input type='password' {...register('password')}></input>
          {errors.password && (
            <p className='text-red-500 text-sm'>{`${errors.password.message}`}</p>
          )}
        </div>
        {/* BUTTONS */}
        <div className='flex justify-center gap-4'>
          <button
            disabled={isSubmitting}
            className='px-4 py-1 bg-gradientBtn hover:bg-gradientHoverBtn text-white rounded-md disabled:bg-disabledGradientBtn disabled:cursor-not-allowed'
          >
            Login
          </button>
        </div>
        {formError && (
          <div className='text-red-500 text-center'>{formError}</div>
        )}
      </div>
    </form>
  );
}
