import React from 'react';
import styles from './ReviewCard.module.css';

export const ReviewCard = ({ text, name, title }) => {
  return (
    <div className={styles.reviewCard}>
      <div className={styles.reviewText}>{text}</div>
      <div className={styles.reviewName}>{name}</div>
      <div className={styles.reviewTitle}>{title}</div>
    </div>
  );
};