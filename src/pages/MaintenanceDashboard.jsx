import React, { useState } from 'react';
import { SidebarItem } from './components/SideBarItem';
import { MaintenanceRequest } from './components/MaintenanceRequest';
import styles from './MaintenanceDashboard.module.css';
import { Link } from 'react-router-dom';

// Import local images
import profileIcon from './Images/profile.png';
import termsIcon from './Images/terms.png';
import messagesIcon from './Images/messages.png';
import maintenanceIcon from './Images/maintenance.png';
import paymentsIcon from './Images/payments.png';
import settingsIcon from './Images/settings.png';
import logoutIcon from './Images/logout.png';
import maintenance from './Images/maintenanceIcon.png';
import messageIcon from './Images/messageIcon.png';
import repair from './Images/repair.png';

const sidebarItems = [
    { icon: profileIcon, label: 'PROFILE', link: '/DashboardTenant' },
    { icon: termsIcon, label: 'TERMS AND DOCS', link: '/TermsAndDocs' },
    { icon: messagesIcon, label: 'MESSAGES', link: '/MessageTenant' },
    { icon: maintenanceIcon, label: 'MAINT . & REPAIRS', link: '/MaintenanceDashboard' },
    { icon: paymentsIcon, label: 'PAYMENTS', link: '/PaymentTenant' },
    { icon: settingsIcon, label: 'SETTINGS', link: '/Settings' },
    { icon: logoutIcon, label: 'LOGOUT', link: '/LogoutPage' } 
];

const maintenanceRequests = [
  {
    image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/661e38348084074a5c0a9ae2139a84be2a868786117bbcbfb737e3f78f74a042?placeholderIfAbsent=true&apiKey=febb6e01b7be4e54a81beb5e9ff50628',
    content: <>
      Plumbing<br />
      Toilet leaks, drain stoppages, pipe bursts or leaks,<br />
      hot water heater, garbage disposal, and no water requests<br />
    </>
  },
  {
    image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/78d0959984463cbd989c906c60a441bd535168954dee67edb55a1d197b1abd65?placeholderIfAbsent=true&apiKey=febb6e01b7be4e54a81beb5e9ff50628',
    content: <>
      Electrical Problems<br />
      Power outlets, lights, outages, exhaust fan, appliance fixing<br />
    </>
  },
  {
    image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/577e99b2728b16cdf3235a48060c8f21764b8fd9c29999b0952b44455625d40c?placeholderIfAbsent=true&apiKey=febb6e01b7be4e54a81beb5e9ff50628',
    content: <>
      Locksmith<br />
      Rekey, lockouts, and damaged or broken locks<br />
    </>
  },
  {
    image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ba85b770b4cde589f6ba467d545c68d5af231b8f0173d917b76b10136ab21a63?placeholderIfAbsent=true&apiKey=febb6e01b7be4e54a81beb5e9ff50628',
    content: <>
      Other general repairs<br />
      Wall repairs, ceiling repairs, flooring repairs, doors, cabinets,<br />
      drawers, windows, interior painting, and other miscellaneous<br />
      repairs<br />
    </>
  }
];

const MaintenanceDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedRequests, setSelectedRequests] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleRequestSelect = (index) => {
    setSelectedRequests((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((id) => id !== index); // Remove if already selected
      } else {
        return [...prevSelected, index]; // Add if not selected
      }
    });
  };

  return (
    <div className={styles.dashboardContainer}>
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
          {/* Header with Icon and Title */}
          <header className={styles.header}>
            <img
              src={maintenanceIcon}
              className={styles.headerIcon}
              alt="Maintenance Icon"
              loading="lazy"
            />
            <div className={styles.headerTitle}>MAINTENANCE AND REPAIRS</div>
          </header>

          {/* Maintenance Request Form */}
          <section className={styles.maintenanceForm}>
            <h2 className={styles.formTitle}>ADD MAINTENANCE REQUEST</h2>
            <div className={styles.progressBar}>
              <div className={styles.progressStep}>
                <div className={styles.progressIndicator} />
                <span className={styles.stepLabel}>General Information</span>
              </div>
              <div className={styles.inactiveStep}>
                <div className={styles.inactiveIndicator} />
              </div>
            </div>

            <div className={styles.requestContainer}>
              <p>Please select one or more of the following maintenance requests to proceed:</p>
              {maintenanceRequests.map((request, index) => (
                <div key={index} className={styles.requestItem}>
                  <input
                    type="checkbox"
                    id={`request-${index}`}
                    checked={selectedRequests.includes(index)}
                    onChange={() => handleRequestSelect(index)}
                    className={styles.requestCheckbox}
                  />
                  <label htmlFor={`request-${index}`} className={styles.requestLabel}>
                    <MaintenanceRequest image={request.image}>
                      {request.content}
                    </MaintenanceRequest>
                  </label>
                </div>
              ))}
            </div>
            <Link to="/MaintenanceDescription" className={styles.nextButton}>
              Next
            </Link>
          </section>
        </main>
      </div>
    </div>
  );
};

export default MaintenanceDashboard;
