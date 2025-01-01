import React from 'react';
import { ReviewCard } from './components/ReviewCard';
import { ServiceCard } from './components/ServiceCard';
import { StatCard } from './components/StatCard';
import { Link } from 'react-router-dom'; // Import Link
import styles from './LandingPage.module.css';

const stats = [
  { number: '100', suffix: '+', label: 'Tenants' },
  { number: '90', suffix: '+', label: 'Properties' },
  { number: '7', suffix: '+', label: 'Years in Business' }
];

const services = [
  {
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/bd4faf7a83d7b9c6e181bb272434979334ffeb0c36a3febc88498def4de09a77?placeholderIfAbsent=true&apiKey=febb6e01b7be4e54a81beb5e9ff50628',
    title: 'Premium Homes',
    description: 'Experience luxury living at our executive homes, where modern elegance meets convenience. Our residences are thoughtfully designed to offer the finest amenities, ensuring a comfortable and upscale lifestyle.'
  },
  {
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7b2c712581b138388ffc7b945cf15c57be4b59aa083ee9756dfff881cfd17d36?placeholderIfAbsent=true&apiKey=febb6e01b7be4e54a81beb5e9ff50628',
    title: 'Top-notch security',
    description: 'Enjoy peace of mind with round-the-clock security, featuring state-of-the-art surveillance cameras, secure access points, and highly trained on-site personnel dedicated to ensuring the utmost safety for all residents.'
  },
  {
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b1978c5927aa350d6b17f7ffcf4848ed86d06f128b9d952de6c0edd4e59604ba?placeholderIfAbsent=true&apiKey=febb6e01b7be4e54a81beb5e9ff50628',
    title: 'High-speed internet',
    description: 'Enjoy peace of mind with round-the-clock security, featuring state-of-the-art surveillance cameras, secure access points, and highly trained on-site personnel dedicated to ensuring the utmost safety for all residents.'
  }
];

const reviews = [
  {
    text: 'Best decision I have made. I cannot recommend Haven Heights enough',
    name: 'Name',
    title: 'Title'
  },
  {
    text: 'Outstanding service and seamless experience!',
    name: 'Name',
    title: 'Title'
  },
  {
    text: 'Best decision I have made. I cannot recommend Haven Heights enough',
    name: 'Name',
    title: 'Title'
  }
];

const LandingPage = () => {
  return (
    <div className={styles.landingPage}>
      <header className={styles.header}>
        <nav className={styles.navigation}>
          <div className={styles.navLinks}>
          <Link to="/AboutUs" className={styles.navLink}>About Us</Link>
          <Link to="/Services" className={styles.navLink}>Our Services</Link>
          <Link to="/HowItWorks" className={styles.navLink}>How it works</Link>
          </div>
          <Link to="/Login" className={styles.signInButton}>
            Sign in
          </Link>
        </nav>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
          <h2 className={styles.tenantEaseHeading}>TenantEase</h2>
            <h1 className={styles.heroTitle}>
              <span className={styles.regularText}>Making it feel more like </span>
              <span className={styles.highlightText}>home</span>
            </h1>
            <p className={styles.heroDescription}>
              A simple experience to communicate and process rent payment easily at absolutely no cost.
            </p>
            
            <div className={styles.statsContainer}>
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
              <Link to="/UserTypeSelection" className={styles.ctaButton}>
                GET STARTED
              </Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/bfae5e294f366be142520ac4d0b222ce4961236e28fb3485c9e03b84406a16d4?placeholderIfAbsent=true&apiKey=febb6e01b7be4e54a81beb5e9ff50628" alt="Haven Heights property" className={styles.propertyImage} />
          </div>
        </section>

        <section className={styles.servicesSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.divider} />
            <h2 className={styles.sectionTitle}>Our Services</h2>
            <div className={styles.divider} />
          </div>
          
          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </section>

        <section className={styles.reviewsSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.divider} />
            <h2 className={styles.sectionTitle}>Verified Reviews</h2>
            <div className={styles.divider} />
          </div>
          
          <div className={styles.reviewsGrid}>
            {reviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBranding}>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/a3089ba908370f806f14b18b7293beb1b9bce52acda949fcde818800c662c082?placeholderIfAbsent=true&apiKey=febb6e01b7be4e54a81beb5e9ff50628" alt="Haven Heights logo" className={styles.footerLogo} />
            <span className={styles.footerBrandName}>TenantEase</span>
          </div>
          
          <div className={styles.footerLinks}>
            <nav className={styles.footerNav}>
              <a href="#home" className={styles.footerLink}>Home</a>
              <a href="#about" className={styles.footerLink}>About Us</a>
              <a href="#services" className={styles.footerLink}>Our Services</a>
              <a href="/SignInPage" className={styles.footerLink}>Sign in</a>
            </nav>
            
            <div className={styles.footerContact}>
              <a href="tel:1234567892" className={styles.footerPhone}>+254796789413</a>
              <a href="mailto:haven@gmail.com" className={styles.footerEmail}>tenantease24@gmail.com</a>
            </div>
          </div>
        </div>
        <p className={styles.copyright}>Tenant Street | all rights reserved</p>
      </footer>
    </div>
  );
};

export default LandingPage;
