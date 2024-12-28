import React from 'react';
import styles from './Settings.module.css';
// import { FormInput } from './FormInput';

export const ProfileForm = () => {
  return (
    <form className={styles.profileForm}>
      <div className={styles.formColumns}>
        <div className={styles.formColumn}>
          <h2 className={styles.profileTitle}>Profile</h2>
          <div className={styles.inputGroup}>
            <label htmlFor="firstName" className={styles.inputLabel}>First Name</label>
            <input type="text" id="firstName" className={styles.inputField} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.inputLabel}>Email</label>
            <input type="email" id="email" className={styles.inputField} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.inputLabel}>Password</label>
            <input type="password" id="password" className={styles.inputField} />
          </div>
        </div>
        <div className={styles.formColumn}>
          <div className={styles.editSection}>
            <button type="button" className={styles.editButton}>Edit</button>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="lastName" className={styles.inputLabel}>Last Name</label>
            <input type="text" id="lastName" className={styles.inputField} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="newPassword" className={styles.inputLabel}>New Password</label>
            <input type="password" id="newPassword" className={styles.inputField} />
          </div>
          <button type="submit" className={styles.saveButton}>SAVE CHANGES</button>
        </div>
      </div>
    </form>
  );
};