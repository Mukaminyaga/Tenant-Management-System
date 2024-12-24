import React from 'react';
import styles from './MenuToggle.module.css';

export const MenuToggle = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <button 
      className={styles.menuToggle}
      onClick={handleToggle}
      aria-expanded={isOpen}
      aria-label="Toggle menu"
    >
      <span className={styles.menuLine} />
      <span className={styles.menuLine} />
      <span className={styles.menuLine} />
    </button>
  );
};