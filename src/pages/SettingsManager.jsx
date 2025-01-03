import React, { useState } from 'react';
import styles from './Settings.module.css';
import settingsIcon from './Images/settings.png';
import { ProfileFormManager } from './ProfileFormManager';
import { Link } from 'react-router-dom';

const menuItems = [
  { name: 'DASHBOARD', path: '/Dashboard' },
  { name: 'PROPERTIES', path: '/properties' },
  { name: 'TENANTS & LEASES', path: '/Tenants' },
  { name: 'MAINT . & REPAIRS', path: '/maintenance-repairs' },
  { name: 'NOTICES', path: '/Send Alert' },
  { name: 'PAYMENTS', path: '/payments' },
  { name: 'SETTINGS', path: '/Profile Settings' },
  { name: 'LOGOUT', path: '/logout' },
];

const SettingsManager = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.contentWrapper}>
        {/* Sidebar Toggle Button */}
        <button className={styles.sidebarToggle} onClick={toggleSidebar}>
          <div className={styles.hamburger}></div>
        </button>

        <aside
          className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}
        >
        <div className={styles.sidebarColumn}>
          <nav className={styles.sidebarContainer}>
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={styles.menuButton}
                aria-label={item.name.toLowerCase()}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        </aside>

        <main className={styles.mainContent}>
          <header className={styles.headerSettings}>
            <img
              loading="lazy"
              src={settingsIcon}
              alt="Settings Icon"
              className={styles.headerSettingsIcon}
            />
            <h2 className={styles.headerSettingsTitle}>SETTINGS</h2>
          </header>

          <section className={styles.content}>
            <h3 className={styles.contentTitle}>Profile Settings</h3>
            <div className={styles.formContainer}>
            <ProfileFormManager />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default SettingsManager;
