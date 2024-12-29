import * as React from "react";
import styles from './SuccessModal.module.css';

export default function SuccessModal() {
  return (
    <div 
      className={styles.successModal}
      role="dialog"
      aria-labelledby="successMessage"
      aria-modal="true"
      tabIndex={-1}
    >
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/55ba73d5f97ad052fc2e1211bd215127567a561ed7c415c871e30dfd365e39bb?placeholderIfAbsent=true&apiKey=febb6e01b7be4e54a81beb5e9ff50628"
        className={styles.successImage}
        alt="Profile update success illustration"
      />
      <div id="successMessage" className={styles.successMessage}>
        Your profile has been successfully updated!
      </div>
      <div className={styles.dismissText}>
        Click anywhere outside this box...
      </div>
    </div>
  );
}