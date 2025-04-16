import React from 'react';
import styles from './ServiceCard.module.css';

export const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className={styles.serviceCard}>
      <div className={styles.serviceHeader}>
        {/* <img loading="lazy" src={icon} alt={`${title} icon`} className={styles.serviceIcon} /> */}
        <div className={styles.serviceTitle}>{title}</div>
      </div>
      <div className={styles.serviceDescription}>{description}</div>
    </div>
  );
};