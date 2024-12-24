import * as React from "react";
import styles from './LogoutPage.module.css';

export default function LogoutPage() {
  return (
    <div className={styles.logoutContainer}>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/497d49163a9f188cc6c2e715020cff2e12a2d885a12576616370ec4a8c153db2?placeholderIfAbsent=true&apiKey=febb6e01b7be4e54a81beb5e9ff50628"
        className={styles.logoutImage}
        alt="Logout confirmation"
      />
    </div>
  );
}
