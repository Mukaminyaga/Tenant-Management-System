import React from 'react';
import styles from '../MaintenanceDescription.module.css';

export const MaintenanceForm = () => {
  return (
    <form className={styles.maintenanceForm}>
      <div className={styles.formHeader}>
        <div className={styles.formSection}>
          <h2 className={styles.formTitle}>ADD MAINTENANCE REQUEST</h2>
          <div className={styles.generalInfoSection}>
            <div className={styles.inactiveBar} />
            <div className={styles.sectionTitle}>General Information</div>
          </div>
        </div>
        <div className={styles.formSection}>
          <div className={styles.activeBar} />
          <div className={styles.sectionTitle}>Description</div>
        </div>
      </div>

      <label htmlFor="description" className={styles.descriptionLabel}>
        To help us better understand the issue, kindly provide a description of the
        problem you're facing.
      </label>
      <textarea
        id="description"
        className={styles.descriptionInput}
        placeholder="Enter your apartment number and name first"
        aria-label="Maintenance request description"
      />

      <div className={styles.disclaimer}>
        By submitting this request, I give management and/or their service professionals
        permission to inspect and complete the work requested, if deemed necessary.
      </div>

      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
};