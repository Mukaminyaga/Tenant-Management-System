import React, { useState } from 'react';
import { SidebarItem } from './components/SideBarItem';
import { StatCard } from './components/StatCard1';
import { ActionCard } from './components/ActionCard';
import styles from './Dashboard.module.css';
import { Link } from 'react-router-dom';

// Import local images
import profileIcon from '../Images/profile.png';
import termsIcon from '../Images/terms.png';
import messagesIcon from '../Images/messages.png';
import maintenanceIcon from '../Images/maintenance.png';
import paymentsIcon from '../Images/payments.png';
import settingsIcon from '../Images/settings.png';
import logoutIcon from '../Images/logout.png';
import maintenance from '../Images/maintenanceIcon.png';
import messageIcon from '../Images/messageIcon.png';

const sidebarItems = [
    { icon: profileIcon, label: 'PROFILE', link: '/DashboardTenant' },
    { icon: termsIcon, label: 'TERMS AND DOCS', link: '/TermsAndDocs' },
    { icon: messagesIcon, label: 'MESSAGES', link: '/MessageTenant' },
    { icon: maintenanceIcon, label: 'MAINT . & REPAIRS', link: '/Report Issue' },
    { icon: paymentsIcon, label: 'PAYMENTS', link: '/PaymentTenant' },
    { icon: settingsIcon, label: 'SETTINGS', link: '/Settings' },
    { icon: logoutIcon, label: 'LOGOUT', link: '/LogoutPage' } 
];

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.layoutWrapper}>
        {/* Sidebar Toggle Button */}
        <button className={styles.sidebarToggle} onClick={toggleSidebar}>
          <div className={styles.hamburger}></div>
        </button>

        <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
          <h1 className={styles.sidebarTitle}>DASHBOARD</h1>
          {sidebarItems.map((item, index) => (
            <Link key={index} to={item.link} className={styles.sidebarLink}>
              <SidebarItem {...item} />
            </Link>
          ))}
        </aside>

        <main className={styles.mainContent}>
          <header className={styles.header}>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6e46a0783940f90b9f5158d5735cabad42c3f272463b4866e52b268c0c9bbc76?placeholderIfAbsent=true&apiKey=febb6e01b7be4e54a81beb5e9ff50628"
              alt=""
              className={styles.headerIcon}
            />
            <h1 className={styles.headerTitle}>DASHBOARD</h1>
          </header>

          <section className={styles.contentSection}>
            <div className={styles.statsHeader} onClick={toggleDropdown}>
              <h2 className={styles.statsTitle}>ALL TENANCIES</h2>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/149ab9a1fd1230dbab4749450cc0fb898ac147c7b93ec51547487cf4873f4f04?placeholderIfAbsent=true&apiKey=febb6e01b7be4e54a81beb5e9ff50628"
                alt=""
                className={styles.statsIcon}
              />
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <ul>
                  {/* <li>All Tenancies</li> */}
                  <li>Current Tenancy</li>
                </ul>
              </div>
            )}

            <div className={styles.statsGrid}>
              <StatCard
                title="OPEN MAINT."
                count="0"
                link="/maintenance" // Link to Maintenance page
              />
              <StatCard
                title="LATE PAYMENTS"
                count="0"
                link="/late-payments" // Link to Late Payments page
              />
            </div>

            <div className={styles.actionGrid}>
              <ActionCard
                title="MAINTENANCE"
                description="Submit a maintenance request"
                icon={maintenance}
                link="/MaintenanceDashboard" 
              />
              <ActionCard
                title="MESSAGE"
                description="Send message to property rep"
                icon={messageIcon}
                link="/MessageTenant"
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
