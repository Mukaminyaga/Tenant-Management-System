import React, { useState } from 'react';
import Sidebar from './Sidebartenant';
import { ProfileForm } from './ProfileForm';
import styles from './Settings.module.css';


const Settings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={styles.dashboardContainer}>

      {/* Mobile Sidebar Toggle */}
      <button 
        className={styles.sidebarToggle} 
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <div className={styles.hamburger}></div>
      </button>

      {/* Sidebar Component */}
      <Sidebar className={sidebarOpen ? styles.sidebarOpen : ''} />
      
      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1>SETTINGS</h1>
          <p className={styles.subtitle}>Manage your account preferences</p>
        </header>

        <section className={styles.settingsSection}>
          <div className={styles.settingsCard}>
            <h2 className={styles.sectionTitle}>Profile Settings</h2>

            <ProfileForm />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Settings;