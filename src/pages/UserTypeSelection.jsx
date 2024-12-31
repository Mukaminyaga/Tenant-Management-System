import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import styles from './UserTypeSelection.module.css';
import UserTypeCard from './UserTypeCard';

export default function UserTypeSelection() {
  const [selectedType, setSelectedType] = useState(null);
  const navigate = useNavigate(); // Hook for programmatic navigation

  const userTypes = [
    {
      title: 'Tenant',
      iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/39e3f9023c0aa06b74c860b48310808abf00fd38c9cc87bb85f700e828961bcc?placeholderIfAbsent=true&apiKey=febb6e01b7be4e54a81beb5e9ff50628',
      type: 'tenant',
      redirectTo: '/', // Route for Tenant
    },
    {
      title: 'Property Manager',
      iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/5543db38f89823642ef7b8ec1bdaea95209fbc016b5247b4efda824c9a6906c5?placeholderIfAbsent=true&apiKey=febb6e01b7be4e54a81beb5e9ff50628',
      type: 'manager',
      redirectTo: '/SignUpManager', // Route for Property Manager
    },
  ];

  const handleCardClick = (type) => {
    setSelectedType(type.type);
    navigate(type.redirectTo); // Navigate to the appropriate page
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* <div className={styles.menuIcon}>
          <div className={styles.menuBar} />
          <div className={styles.menuBar} />
          <div className={styles.menuBar} />
        </div> */}
        <div className={styles.content}>
          <div className={styles.header}>
            <h1 className={styles.title}>Select your role</h1>
            <p className={styles.subtitle}>
              To sign you up, we need to customize your preferences based on your role.
            </p>
            <div className={styles.cardsContainer}>
              <div className={styles.cardsWrapper}>
                {userTypes.map((type) => (
                  <div key={type.type} className={styles.cardColumn}>
                    <UserTypeCard
                      title={type.title}
                      iconSrc={type.iconSrc}
                      isActive={selectedType === type.type}
                      onClick={() => handleCardClick(type)} // Handle click and navigate
                    />
                  </div>
                ))}
              </div>
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/51069f46948ac5baaa682a6a4ec64a67acf8be6313a2837d9f8e52b8820ca6ad?placeholderIfAbsent=true&apiKey=febb6e01b7be4e54a81beb5e9ff50628"
              alt=""
              className={styles.progressIndicator}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
