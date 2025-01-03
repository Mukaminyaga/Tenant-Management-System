import * as React from "react";
import { Link, useNavigate } from "react-router-dom";  // Import useNavigate from react-router-dom
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import styles from './ResetPasswordForm.module.css';
import { useState } from "react";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");  // State to store email input
  const [loading, setLoading] = useState(false);  // State for loading spinner
  const [message, setMessage] = useState("");  // State for message to show success or error
  const [error, setError] = useState("");  // State for error message

  const navigate = useNavigate();  // Initialize the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
      
      // Redirect to the home page ('/')
      setTimeout(() => {
        navigate('/');  // Redirect after a delay to allow user to see the message
      }, 2000);  // Redirects after 2 seconds (optional delay)
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.resetPasswordContainer}>
      <div className={styles.contentWrapper}>
        <Link to="/Login" className={styles.backLink}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a2e4a46e6ee426956475cf5f309693b3ac7ed42646306bbb67301d658b6acb72?placeholderIfAbsent=true&apiKey=febb6e01b7be4e54a81beb5e9ff50628"
            className={styles.backIcon}
            alt="Back to previous page"
          />
        </Link>
        <div className={styles.formCard}>
          <div className={styles.formContent}>
            <h1 className={styles.title}>Forgot Password?</h1>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Capture email input
              />
              <button type="submit" className={styles.submitButton} disabled={loading}>
                {loading ? "Sending..." : "Get an email"}
              </button>
            </form>
            {message && <p className={styles.successMessage}>{message}</p>}
            {error && <p className={styles.errorMessage}>{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordForm;
