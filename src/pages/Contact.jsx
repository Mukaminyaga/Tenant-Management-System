import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import NavBar from './NavBar';
import styles from './Contact.module.css';

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <>
      <NavBar />
      
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Contact Us</h1>
            <p className={styles.subtitle}>Have questions or need assistance? Reach out to our team.</p>
          </div>

          <div className={styles.content}>
            {/* Contact Form */}
            <div className={styles.formContainer}>
              <form onSubmit={handleSubmit} className={styles.contactForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" name="name" required />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" name="email" required />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject">Subject</label>
                  <input type="text" id="subject" name="subject" required />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">Your Message</label>
                  <textarea id="message" name="message" rows="5" required></textarea>
                </div>

                <button type="submit" className={styles.submitButton}>
                  Send Message <FaArrowRight className={styles.arrowIcon} />
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className={styles.infoContainer}>
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <FaPhone />
                </div>
                <p>+1 (555) 123-4567</p>
                <p>Mon-Fri: 9am-5pm</p>
                <div className={styles.infoIcon}>
                  <FaEnvelope />
                </div>
                <a href='mailto:tenantease24@gmail.com'>tenantease24@gmail.com</a>
                <p>response within 24 hours</p>
              </div>

              <div className={styles.mapContainer}>
                <iframe
                  title="Office Location"
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.954258968697!2d37.10286541533048!3d-1.101883099227145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f4f1a9cba9f0f%3A0x5f3e3a3b3b3b3b3b!2sJuja%2C%20Kiambu%2C%20Kenya!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus'
                  className={styles.map}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;