import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from './SignInForm.module.css';

export const SignInForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
      <h1 className={styles.title}>Sign In</h1>
      
      <div className={styles.inputGroup}>
        <label htmlFor="email" className={styles.label}>Email</label>
        <input
          id="email"
          type="email"
          className={styles.input}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && (
          <span role="alert" className={styles.error}>
            {errors.email.message}
          </span>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="password" className={styles.label}>Password</label>
        <input
          id="password"
          type="password"
          className={styles.input}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters'
            }
          })}
          aria-invalid={errors.password ? 'true' : 'false'}
        />
        {errors.password && (
          <span role="alert" className={styles.error}>
            {errors.password.message}
          </span>
        )}
      </div>

      <button type="submit" className={styles.submitButton}>
        Sign In
      </button>
    </form>
  );
};