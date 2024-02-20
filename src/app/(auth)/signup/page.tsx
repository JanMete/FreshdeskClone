'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from '../auth.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { TSignUpSchema, singnUpSchema } from '@/app/lib/schema/schema';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignUpSchema>({ resolver: zodResolver(singnUpSchema) });

  const [formError, setFormError] = useState('');
  const router = useRouter();

  const onSubmit = async (data: TSignUpSchema) => {
    const supabase = createClientComponentClient<Database>();
    const { error } = await supabase.auth.signUp({
      email: data.user_email,
      password: data.password,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    });
    if (error) {
      setFormError(error.message);
    }
    if (!error) {
      const res = await fetch(`${location.origin}/api/auth/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data.user_email),
      });

      const json = await res.json();

      if (json.error) {
        console.log(json.error);
      }
      router.push('/verify');
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='py-10 flex flex-col justify-center items-center'
    >
      <div className='w-2/12 flex flex-col gap-6'>
        {/* USERNAME */}
        {/* <div className={styles.inputContainer}>
          <label>Username</label>
          <input type='text' {...register('user')} />
          {errors.user && (
            <p className='text-red-500 text-sm'>{`${errors.user.message}`}</p>
          )}
        </div> */}
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
        {/* CONFIRM PASSWORD */}
        <div className={styles.inputContainer}>
          <label>Confirm Password</label>
          <input type='password' {...register('confirm_password')}></input>
          {errors.confirm_password && (
            <p className='text-red-500 text-sm'>{`${errors.confirm_password.message}`}</p>
          )}
        </div>
        {formError && <div>{formError}</div>}
        {/* BUTTONS */}
        <div className='flex justify-center gap-4'>
          <button
            disabled={isSubmitting}
            className='px-4 py-1 bg-gradientBtn hover:bg-gradientHoverBtn text-white rounded-md disabled:bg-disabledGradientBtn disabled:cursor-not-allowed'
          >
            Sign Up
          </button>
        </div>
      </div>
    </form>
  );
}
