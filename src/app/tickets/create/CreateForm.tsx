import React from 'react';
import styles from './createForm.module.css';
import { useForm } from 'react-hook-form';

export default function CreateForm() {
  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors, isSubmitting },
  //     reset,
  //   } = useForm();

  return (
    <form className='py-10 flex flex-col justify-center items-center'>
      <div className='w-4/5'>
        <div className={styles.inputContainer}>
          <label>Subject</label>
          <input type='text' />
        </div>
        <div className={styles.inputContainer}>
          <label>Status</label>
          <select defaultValue={'open'} name='status'>
            <option value='open'>Open</option>
            <option value='pending'>Pending</option>
            <option value='resolved'>Resolved</option>
            <option value='waiting for customer response'>
              Waiting for customer response
            </option>
          </select>
        </div>
        <div className={styles.inputContainer}>
          <label>Status</label>
          <select defaultValue={'low'} name='priority'>
            <option value='low'>Low</option>
            <option value='medium'>Medium</option>
            <option value='high'>High</option>
            <option value='urgent'>Urgent</option>
          </select>
        </div>
        <div className={styles.inputContainer}>
          <label>Agent</label>
          <select defaultValue={'unassigned'} name='agent'>
            <option value='unassigned'>Unassigned</option>
          </select>
        </div>
        <div className={styles.inputContainer}>
          <label>Description</label>
          <textarea name='body'></textarea>
        </div>
      </div>
    </form>
  );
}
