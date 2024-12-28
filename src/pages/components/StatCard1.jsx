import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import styles from '../Dashboard.module.css';

export const StatCard = ({ title, count, hasViewButton = true, link }) => {
  return (
    <div className={styles.statCard}>
      <div className={styles.statTitle}>{title}</div>
      <div className={styles.statCount}>{count}</div>
      {hasViewButton && (
        <Link to={link} className={styles.viewLink}>
          <button className={styles.viewButton} tabIndex={0}>VIEW</button>
        </Link>
      )}
    </div>
  );
};
