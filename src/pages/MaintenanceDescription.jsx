import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const { selectedIssues = [], otherIssue = '' } = location.state || {};
  const [tenantName, setTenantName] = useState('');
  const [apartmentNumber, setApartmentNumber] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const issuesToSend = [...selectedIssues];
    if (otherIssue) {
      issuesToSend.push(`Other: ${otherIssue}`);
    }

    const templateParams = {
      tenant_name: tenantName,
      apartment_number: apartmentNumber,
      issues: issuesToSend.join(', '),
      to_email: 'tenantease24@gmail.com',
    };

    emailjs
      .send('service_p2qlcyf', 'template_nk1fb0t', templateParams, 'Dh4Ug8jsugp-UA63S')
      .then(() => {
        setMessageSent(true);
        setTenantName('');
        setApartmentNumber('');
      })
      .catch((err) => {
        console.error('Failed to send email:', err);
      });
  };

  return (
    <div className={styles.container}>
      <h2>Maintenance Request Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={tenantName}
            onChange={(e) => setTenantName(e.target.value)}
            required
          />
        </label>
        <label>
          Apartment Number:
          <input
            type="text"
            value={apartmentNumber}
            onChange={(e) => setApartmentNumber(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {messageSent && <p>Request sent successfully!</p>}
    </div>
  );
};

export default MaintenanceDescription;
