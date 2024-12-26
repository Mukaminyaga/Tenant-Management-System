import React from 'react';
import styles from './UserTypeCard.module.css';

export default function UserTypeCard({ title, iconSrc, isActive, onClick }) {
  return (
    <div 
      className={isActive ? styles.cardActive : styles.cardInactive}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
    >
      <img
        src={iconSrc}
        alt={`${title} icon`}
        className={styles.cardIcon}
        loading="lazy"
      />
      <div className={styles.cardTitle}>{title}</div>
    </div>
  );
}