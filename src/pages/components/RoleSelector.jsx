import React from 'react';
import styles from './RoleSelector.module.css';

export const RoleSelector = ({ icon, role }) => {
  return (
    <div className={styles.roleContainer}>
      <div className={styles.roleLabel}>Role:</div>
      <div className={styles.roleSelector}>
        <img
          loading="lazy"
          src={icon}
          alt=""
          className={styles.roleIcon}
        />
        <div className={styles.roleName}>{role}</div>
      </div>
    </div>
  );
};