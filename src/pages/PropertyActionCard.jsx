import React from 'react';
import styles from './PropertyActionCard.module.css';

export default function PropertyActionCard({ title, description, onAction }) {
  return (
    <div className={styles.propertyCard}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <button 
        className={styles.actionButton}
        onClick={onAction}
        aria-label={`Start ${title.toLowerCase()} process`}
      >
        START
      </button>
    </div>
  );
}