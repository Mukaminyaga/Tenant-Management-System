import React from 'react';
import PropTypes from 'prop-types';
import styles from './FormManager.module.css';

export const FormManager = ({ 
  label, 
  type = 'text', 
  placeholder, 
  icon, 
  value, 
  onChange 
}) => {
  return (
    <div className={styles.inputContainer}>
      {label && <label className={styles.inputLabel}>{label}</label>}
      <div className={styles.inputWrapper}>
        <input
          type={type}
          className={styles.input}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          aria-label={label}
        />
        {icon && (
          <img
            loading="lazy"
            src={icon}
            alt=""
            className={styles.inputIcon}
          />
        )}
      </div>
    </div>
  );
};

FormManager.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

FormManager.defaultProps = {
  type: 'text',
  placeholder: '',
  icon: null,
  value: '',
  onChange: () => {},
};
