import React from 'react';
import styles from './MaintenanceRequest.module.css';

export function MaintenanceRequest({ icon, image, children }) {
  return (
    <div className={styles.requestItem} role="button" tabIndex={0}>
      {/* <div className={styles.requestIcon} /> */}
      <img 
        src={image} 
        className={styles.requestImage} 
        alt="" 
        loading="lazy"
      />
      <div className={styles.requestText}>
        {children}
      </div>
    </div>
  );
}