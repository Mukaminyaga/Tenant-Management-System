import React from 'react';
import styles from './HowItWorks.module.css';

export const Step = ({ number, title, description }) => {
  return (
    <div className={styles.stepContent}>
      <div className={styles.stepHeader}>
        <div className={styles.stepNumber}>{number.padStart(2, '0')}</div>
        <div className={styles.stepTitle}>{title}</div>
      </div>
      <div className={styles.stepDescription}>{description}</div>
    </div>
  );
};