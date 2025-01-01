import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { Link } from 'react-router-dom';
import styles from '../MaintenanceDashboard.module.css';
import { SidebarItem } from '../components/SideBarItem';
// Import local images
import profileIcon from '../Images/profile.png';
import termsIcon from '../Images/terms.png';
import messagesIcon from '../Images/messages.png';
import maintenanceIcon from '../Images/maintenance.png';
import paymentsIcon from '../Images/payments.png';
import settingsIcon from '../Images/settings.png';
import logoutIcon from '../Images/logout.png';
import tapImg from '../Images/tap.png';
import bulbImg from '../Images/bulb.png';
import lockImg from '../Images/lock.png';
import toolsImg from '../Images/tools.png';

const sidebarItems = [
  { icon: profileIcon, label: 'PROFILE', link: '/DashboardTenant' },
  { icon: termsIcon, label: 'TERMS AND DOCS', link: '/TermsAndDocs' },
  { icon: messagesIcon, label: 'MESSAGES', link: '/MessageTenant' },
  { icon: maintenanceIcon, label: 'MAINT . & REPAIRS', link: '/MaintenanceDashboard' },
  { icon: paymentsIcon, label: 'PAYMENTS', link: '/PaymentTenant' },
  { icon: settingsIcon, label: 'SETTINGS', link: '/Settings' },
  { icon: logoutIcon, label: 'LOGOUT', link: '/LogoutPage' } 
];

// Maintenance Request Data
const maintenanceRequests = [
  {
    image: tapImg,
    content: "Plumbing: Toilet leaks, drain stoppages, pipe bursts, hot water heater, garbage disposal, and no water requests."
  },
  {
    image: bulbImg,
    content: "Electrical Problems: Power outlets, lights, outages, exhaust fan, appliance fixing."
  },
  {
    image:lockImg,
    content: "Locksmith: Rekey, lockouts, and damaged or broken locks."
  },
  {
    image: toolsImg,
    content: "Other Repairs: Wall repairs, ceiling repairs, flooring repairs, doors, cabinets, and windows."
  }
];

const ReportMaintenance = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    const toggleSidebar = () => {
      setIsSidebarOpen((prevState) => !prevState);
    };
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [otherIssue, setOtherIssue] = useState('');
  const [tenantName, setTenantName] = useState('');
  const [apartmentNumber, setApartmentNumber] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  // Handle checkbox selection for maintenance issues
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedIssues((prev) => [...prev, value]);
    } else {
      setSelectedIssues((prev) => prev.filter((issue) => issue !== value));
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    const issuesToSend = otherIssue
      ? [...selectedIssues, `Other: ${otherIssue}`]
      : selectedIssues;

    const templateParams = {
      to_email: "tenantease24@gmail.com", // Replace with your target email
      tenant_name: tenantName,
      apartment_number: apartmentNumber,
      issues: issuesToSend.join(", "),
    };

    emailjs.send(
      "service_p2qlcyf", // Replace with your EmailJS service ID
      "template_nk1fb0t", // Replace with your EmailJS template ID
      templateParams,
      "Dh4Ug8jsugp-UA63S" // Replace with your EmailJS public key
    ).then(
      () => {
        setMessageSent(true);
        setSelectedIssues([]);
        setOtherIssue('');
        setTenantName('');
        setApartmentNumber('');
      },
      (error) => {
        console.error("Failed to send email:", error);
      }
    );
  };

  return (
    <div className={styles.dashboardContainer}>
       <div className={styles.layoutWrapper}>
      <button className={styles.sidebarToggle} onClick={toggleSidebar}>
              <div className={styles.hamburger}></div>
            </button>
      {/* Sidebar */}
         <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
            <div className={styles.sidebarContent}>
              <h1 className={styles.sidebarTitle}>DASHBOARD</h1>
              <nav>
                {sidebarItems.map((item, index) => (
                  <SidebarItem
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    link={item.link} // Pass the link to SidebarItem
                  />
                ))}
              </nav>
            </div>
          </aside>

      {/* Main content */}
      <main className={styles.mainContent}>
        {/* Header */}
        <header className={styles.header}>
          <img src={maintenanceIcon} className={styles.headerIcon} alt="Maintenance Icon" />
          <h2 className={styles.headerTitle}>Report Maintenance Issue</h2>
        </header>

        <section className={styles.maintenanceForm}>
          <h3 className={styles.formTitle}>Select Maintenance Requests</h3>

          {/* Maintenance Request Options */}
          <div className={styles.requestList}>
            {maintenanceRequests.map((request, index) => (
              <div key={index} className={styles.requestItem}>
                <input
                  type="checkbox"
                  value={request.content}
                  onChange={handleCheckboxChange}
                  checked={selectedIssues.includes(request.content)}
                />
                <label>
                  <img src={request.image} alt={request.content} className={styles.requestImage} />
                  <p>{request.content}</p>
                </label>
              </div>
            ))}
          </div>

          {/* Other Issue */}
          {selectedIssues.includes("Other") && (
            <textarea
              placeholder="Please describe your issue"
              value={otherIssue}
              onChange={(e) => setOtherIssue(e.target.value)}
              className={styles.otherIssueText}
            />
          )}

          {/* Tenant Details */}
          <div className={styles.tenantDetails}>
            <input
              type="text"
              value={tenantName}
              onChange={(e) => setTenantName(e.target.value)}
              placeholder="Enter your name"
              className={styles.inputField}
              required
            />
            <input
              type="text"
              value={apartmentNumber}
              onChange={(e) => setApartmentNumber(e.target.value)}
              placeholder="Enter your apartment number"
              className={styles.inputField}
              required
            />
          </div>

          {/* Submit Button */}
          <button className={styles.submitButton} onClick={handleSubmit}>Submit</button>

          {/* Success Message */}
          {messageSent && <p className={styles.successMessage}>Message sent successfully!</p>}
        </section>
      </main>
    </div>
    </div>
  );
};

export default ReportMaintenance;
