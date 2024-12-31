import React from 'react';
import styles from './DashboardMetricCard.module.css';

export default function DashboardMetricCard({ title, value, onView }) {
  return (
    <div className={styles.metricCard}>
      <div className={styles.title}>{title}</div>
      <div className={styles.value}>{value}</div>
      <button 
        className={styles.viewButton} 
        onClick={onView}
        aria-label={`View ${title.toLowerCase()} details`}
      >
        View
      </button>
    </div>
  );
}