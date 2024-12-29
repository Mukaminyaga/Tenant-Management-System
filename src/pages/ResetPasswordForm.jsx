import * as React from "react";
import { Link } from "react-router-dom";  // Import Link from react-router-dom
import styles from './ResetPasswordForm.module.css';

const ResetPasswordForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.resetPasswordContainer}>
      <div className={styles.contentWrapper}>
        <Link to="/Login" className={styles.backLink}>  {/* Wrap the image with a Link component */}
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a2e4a46e6ee426956475cf5f309693b3ac7ed42646306bbb67301d658b6acb72?placeholderIfAbsent=true&apiKey=febb6e01b7be4e54a81beb5e9ff50628"
            className={styles.backIcon}
            alt="Back to previous page"
          />
        </Link>
        <div className={styles.formCard}>
          <div className={styles.formContent}>
            <h1 className={styles.title}>Forgot Password ?</h1>
            <p className={styles.description}>
              Enter your email below, and we'll email you instructions to
              reset your password.
            </p>
            <form onSubmit={handleSubmit} className={styles.inputWrapper}>
              <label htmlFor="emailInput" className={styles['visually-hidden']}>
                Enter your email
              </label>
              <input
                type="email"
                id="emailInput"
                className={styles.emailInput}
                placeholder="Enter your email"
                required
                aria-label="Enter your email"
              />
              <button type="submit" className={styles.submitButton}>
                Get an email
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordForm;
