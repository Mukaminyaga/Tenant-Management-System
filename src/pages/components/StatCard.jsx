import React from 'react';
import styles from './StatCard.module.css';

export const StatCard = ({ number, suffix, label }) => {
  return (
    <div className={styles.statCard}>
      <div className={styles.statNumber}>
        {number}<span className={styles.statSuffix}>{suffix}</span>
      </div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
};