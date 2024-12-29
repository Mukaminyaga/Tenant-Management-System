import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import styles from '../Dashboard.module.css';

export const SidebarItem = ({ icon, label, link }) => {
  return (
    <Link to={link} className={styles.sidebarItem} role="button" tabIndex={0}>
      <img loading="lazy" src={icon} alt={label} className={styles.sidebarIcon} />
      <div className={styles.sidebarLabel}>{label}</div>
    </Link>
  );
};
