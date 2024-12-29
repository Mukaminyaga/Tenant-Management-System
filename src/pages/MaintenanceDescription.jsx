import React, { useState } from 'react';
import { SidebarItem } from './components/SideBarItem';
import { MaintenanceForm } from './components/MaintenanceForm';
import styles from './MaintenanceDescription.module.css';
import { Link } from 'react-router-dom';

// Import local images for sidebar
import profileIcon from './Images/profile.png';
import termsIcon from './Images/terms.png';
import messagesIcon from './Images/messages.png';
import maintenanceIcon from './Images/maintenance.png';
import paymentsIcon from './Images/payments.png';
import settingsIcon from './Images/settings.png';
import logoutIcon from './Images/logout.png';
import repair from './Images/repair.png';

const sidebarItems = [
    { icon: profileIcon, label: 'PROFILE', link: '/profile' },
    { icon: termsIcon, label: 'TERMS AND DOCS', link: '/terms-docs' },
    { icon: messagesIcon, label: 'MESSAGES', link: '/MessageTenant' },
    { icon: maintenanceIcon, label: 'MAINT. & REPAIRS', link: '/maintenance' },
    { icon: paymentsIcon, label: 'PAYMENTS', link: '/payments' },
    { icon: settingsIcon, label: 'SETTINGS', link: '/Settings' },
    { icon: logoutIcon, label: 'LOGOUT', link: '/logout' }, // Adjust logout link or handler if it's a special action.
];

const MaintenanceDescription = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.maintenanceRequest}>
      <div className={styles.layoutWrapper}>
        {/* Sidebar Toggle Button */}
        <button className={styles.sidebarToggle} onClick={toggleSidebar}>
          <div className={styles.hamburger}></div>
        </button>

        {/* Sidebar */}
        <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
          <h1 className={styles.sidebarTitle}>DASHBOARD</h1>
          {sidebarItems.map((item, index) => (
            <Link key={index} to={item.link} className={styles.sidebarLink}>
              <SidebarItem {...item} />
            </Link>
          ))}
        </aside>

        {/* Main Content */}
        <main className={styles.mainContent}>
          <header className={styles.pageHeader}>
           <img
            src={repair} // <-- Use imported image
             className={styles.headerIcon}
            alt=""
             loading="lazy"
             />
            <h1 className={styles.headerTitle}>MAINTENANCE AND REPAIRS</h1>
          </header>
          <MaintenanceForm />
        </main>
      </div>
    </div>
  );
};

export default MaintenanceDescription;
