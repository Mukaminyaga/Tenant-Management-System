import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { signUpUser } from '../redux/ActionCreators/authActionsCreator';
import styles from './SignUpTenant.module.css';
import Homeicon from '../Images/Homeicon.png';
import Signup from '../Images/Signup.png';

const SignUpTenant = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [apartmentNumber, setApartmentNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input fields
    if (!firstName || !lastName || !email || !password || !confirmPassword || !apartmentNumber) {
      alert('Please fill in all fields!');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Password validation (at least 8 characters, 1 number, 1 special character)
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert('Password must be at least 8 characters long and contain a number and a special character.');
      return;
    }

    // Combine firstName and lastName as name
    const name = `${firstName} ${lastName}`;
    dispatch(signUpUser(name, email, password, apartmentNumber, setSuccess));
  };

  useEffect(() => {
    if (success) {
      navigate('/Dashboard'); // Redirect to Dashboard on successful signup
    }
  }, [success, navigate]);

  return (
    <div className={styles.signUpContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.formSection}>
          <form className={styles.signUpForm} onSubmit={handleSubmit}>
            <h1 className={styles.formTitle}>Create an account</h1>

            <div className={styles.nameFields}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName" className={styles.formLabel}>
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  className={styles.formInput}
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="lastName" className={styles.formLabel}>
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  className={styles.formInput}
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>
                Email
              </label>
              <input
                id="email"
                type="email"
                className={styles.formInput}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.formLabel}>
                Password
              </label>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className={styles.formInput}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className={styles.showPasswordBtn}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide Password' : 'Show Password'}
              </button>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.formLabel}>
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                className={styles.formInput}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="apartmentNumber" className={styles.formLabel}>
                Apartment Number
              </label>
              <input
                id="apartmentNumber"
                type="text"
                className={styles.formInput}
                placeholder="Enter your apartment number"
                value={apartmentNumber}
                onChange={(e) => setApartmentNumber(e.target.value)}
              />
            </div>

            <div className={styles.roleSelector}>
              <span className={styles.roleLabel}>Role:</span>
              <div className={styles.roleButton}>
                <img src={Homeicon} alt="Home" className={styles.roleIcon} />
                <span className={styles.roleName}>Tenant</span>
              </div>
            </div>

            <button type="submit" className={styles.submitButton}>
              Sign Up
            </button>
          </form>
        </div>

        <div className={styles.sideSection}>
          <div className={styles.menuIcon}>
            <span className={styles.menuLine} />
            <span className={styles.menuLine} />
            <span className={styles.menuLine} />
          </div>
          <div className={styles.signInPrompt}>
            <img src={Signup} alt="Signup" className={styles.backgroundImage} />
            <div className={styles.promptContent}>
              <p className={styles.promptText}>Already have an account?</p>
              <Link to="/SignInPage" className={styles.signInText}>
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpTenant;
