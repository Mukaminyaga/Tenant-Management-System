import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useLocation } from 'react-router-dom';
import styles from './MaintenanceDescription.module.css';

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
