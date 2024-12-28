import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import styles from '../Dashboard.module.css';

export const ActionCard = ({ title, description, icon, link }) => {
  return (
    <div className={styles.actionCard} role="button" tabIndex={0}>
      {/* Wrap content with Link for navigation */}
      <Link to={link} className={styles.actionLink}>
        <h2 className={styles.actionTitle}>{title}</h2>
        <p className={styles.actionDescription}>{description}</p>
        <img loading="lazy" src={icon} alt={title} className={styles.actionIcon} />
      </Link>
    </div>
  );
};
