import React, { useState } from 'react';
import styles from './Settings.module.css';

export const FormInput = ({ label, initialValue, type = "text" }) => {
  const [value, setValue] = useState(initialValue); // Use state to manage the value of the input

  const handleChange = (e) => {
    setValue(e.target.value); // Update the state when the user types in the input
  };

  return (
    <div className={styles.inputGroup}>
      <label className={styles.inputLabel}>{label}</label>
      <input
        type={type}
        className={styles.inputField}
        value={value} // Bind the input value to the state
        onChange={handleChange} // Update the state when the user types
        aria-label={label}
      />
    </div>
  );
};
