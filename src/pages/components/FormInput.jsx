import React from 'react';
import styles from './FormInput.module.css';

export const FormInput = ({ label, placeholder, type = "text", id }) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id} className={styles.inputLabel}>{label}</label>
      <input
        type={type}
        id={id}
        className={styles.inputField}
        placeholder={placeholder}
        aria-label={label}
      />
    </div>
  );
};