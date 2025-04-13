import React, { useState } from 'react';
import { SidebarItem } from './components/SideBarItem';
import styles from './Settings.module.css';
import { ProfileForm } from './ProfileForm';
import TenantSidebar from './TenantSidebar'

import profileIcon from './Images/profile.png';
import termsIcon from './Images/terms.png';
import messagesIcon from './Images/messages.png';
import maintenanceIcon from './Images/maintenance.png';
import paymentsIcon from './Images/payments.png';
import settingsIcon from './Images/settings.png';
import logoutIcon from './Images/logout.png';

const sidebarItems = [
  { icon: profileIcon, label: 'PROFILE', link: '/DashboardTenant' },
  { icon: termsIcon, label: 'TERMS AND DOCS', link: '/TermsAndDocs' },
  { icon: messagesIcon, label: 'MESSAGES', link: '/MessageTenant' },
  { icon: maintenanceIcon, label: 'MAINT . & REPAIRS', link: '/Report Issue' },
  { icon: paymentsIcon, label: 'PAYMENTS', link: '/PaymentTenant' },
  { icon: settingsIcon, label: 'SETTINGS', link: '/Settings' },
  { icon: logoutIcon, label: 'LOGOUT', link: '/LogoutPage' }
];

const Settings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.contentWrapper}>
        {/* Sidebar Toggle Button */}
        {/* <button className={styles.sidebarToggle} onClick={toggleSidebar}>
          <div className={styles.hamburger}></div>
        </button>

        <aside
          className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}
        >
          <div className={styles.sidebarContent}>
            <h1 className={styles.sidebarTitle}>DASHBOARD</h1>
            <nav>
              {sidebarItems.map((item, index) => (
                <SidebarItem
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  link={item.link}
                />
              ))}
            </nav>
          </div>
        </aside> */}
        <TenantSidebar />
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
            <ProfileForm />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Settings;
