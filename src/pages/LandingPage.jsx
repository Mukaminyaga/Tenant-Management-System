import React, { useState, useEffect, useRef } from 'react';
import { ReviewCard } from './components/ReviewCard';
import { ServiceCard } from './components/ServiceCard';
import { StatCard } from './components/StatCard';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaShieldAlt, FaWifi, FaHome, FaStar, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import styles from './LandingPage.module.css';

// Counter Component
const Counter = ({ target, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const targetNumber = parseInt(target);
  const duration = 2000; // Animation duration in ms
  const step = (targetNumber / duration) * 16; // 16ms per frame for 60fps

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const timer = setInterval(() => {
            start += step;
            if (start >= targetNumber) {
              setCount(targetNumber);
              clearInterval(timer);
            } else {
              setCount(Math.ceil(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [targetNumber, step]);

  return (
    <div ref={ref} className={styles.counterNumber}>
      {count}{suffix}
    </div>
  );
};

const stats = [
  { number: '100', suffix: '+', label: 'Happy Tenants'},
  { number: '90', suffix: '+', label: 'Premium Properties'},
  { number: '7', suffix: '+', label: 'Years of Excellence' }
];

const services = [
  {
    icon: <FaHome className={styles.serviceIcon} />,
    title: 'Premium Homes',
    description: 'Experience luxury living at our executive homes, where modern elegance meets convenience. Our residences are thoughtfully designed to offer the finest amenities, ensuring a comfortable and upscale lifestyle.',
    features: ['Luxury furnishings', 'Smart home technology', 'Regular maintenance']
  },
  {
    icon: <FaShieldAlt className={styles.serviceIcon} />,
    title: 'Top-notch Security',
    description: 'Enjoy peace of mind with round-the-clock security, featuring state-of-the-art surveillance cameras, secure access points, and highly trained on-site personnel dedicated to ensuring the utmost safety for all residents.',
    features: ['24/7 surveillance', 'Biometric access', 'Emergency response']
  },
  {
    icon: <FaWifi className={styles.serviceIcon} />,
    title: 'High-speed Internet',
    description: 'Stay connected with our ultra-fast fiber optic internet included in every property. Perfect for remote work, streaming, and smart home devices with guaranteed uptime and dedicated support.',
    features: ['Fiber optic connection', 'Unlimited bandwidth', 'Tech support included']
  }
];

const reviews = [
  {
    text: 'Moving into my TenantEase property was the best decision I made this year.',
    name: 'Sarah Johnson',
    title: 'Software Developer',
    rating: 5,
    date: 'March 2024'
  },
  {
    text: 'Outstanding service and seamless experience! The maintenance team responds within hours.',
    name: 'Michael Chen',
    title: 'Marketing Director',
    rating: 5,
    date: 'February 2024'
  },
  {
    text: 'After years of difficult landlords, TenantEase has been a breath of fresh air.',
    name: 'David Rodriguez',
    title: 'University Professor',
    rating: 5,
    date: 'January 2024'
  }
];

const features = [
  {
    title: "Easy Rent Processing",
    description: "Pay your rent securely through our platform with multiple payment options"
  },
  {
    title: "Maintenance Requests",
    description: "Submit and track maintenance requests with real-time updates"
  },
  {
    title: "Digital Lease Agreements",
    description: "Sign and manage your lease completely online"
  },
  {
    title: "Community Events",
    description: "Connect with neighbors through organized community activities"
  }
];

const LandingPage = () => {
  return (
    <div className={styles.landingPage}>
      <header className={styles.header}>
        <nav className={styles.navigation}>
          <div className={styles.logoContainer}>
            <span className={styles.logoText}>TenantEase</span>
          </div>
          <div className={styles.navLinks}>
            <Link to="/AboutUs" className={styles.navLink}>About Us</Link>
            <Link to="/Services" className={styles.navLink}>Our Services</Link>
            <Link to="/HowItWorks" className={styles.navLink}>How It Works</Link>
            <Link to="/Contact Us" className={styles.navLink}>Contact Us</Link>
          </div>
          <div className={styles.authButtons}>
            <Link to="/Login" className={styles.signInButton}>
              Sign In
            </Link>
            <Link to="/UserTypeSelection" className={styles.registerButton}>
              Register <FaArrowRight className={styles.arrowIcon} />
            </Link>
          </div>
        </nav>
      </header>

      <main className={styles.mainContent}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              <span className={styles.regularText}>Making It Feel More Like</span>
              <span className={styles.highlightText}> Home</span>
            </h1>
            <p className={styles.heroDescription}>
              TenantEase redefines rental living with seamless digital solutions, premium properties, 
              and exceptional service—all designed to make your life easier.
            </p>
            
            {/* Stats Section */}
            <div className={styles.statsContainer}>
              {stats.map((stat, index) => (
                <div key={index} className={styles.statCard}>
                  <h1 className={styles.statContent}>
                    <Counter target={stat.number} suffix={stat.suffix} />
                    <div className={styles.statLabel}>{stat.label}</div>
                  </h1>
                </div>
              ))}
            </div>

            <div className={styles.ctaContainer}>
              <Link to="/SignUp" className={styles.primaryButton}>
                Get Started <FaArrowRight className={styles.arrowIcon} />
              </Link>
              <Link to="/HowItWorks" className={styles.secondaryButton}>
                Learn More
              </Link>
            </div>
          </div>
          
          <div className={styles.heroImageContainer}>
            <img 
              src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="Luxury apartment" 
              className={styles.heroImage} 
            />
            <div className={styles.imageOverlay}>
              <div className={styles.overlayCard}>
                <FaMapMarkerAlt className={styles.overlayIcon} />
                <div>
                  <div className={styles.overlayTitle}>Luxury Properties</div>
                  <div className={styles.overlayText}>Downtown Luxury Lofts</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className={styles.trustSection}>
          <p className={styles.trustText}>Trusted by leading property managers and tenants nationwide</p>
          <div className={styles.trustLogos}>
            <div className={styles.trustLogo}>REMAX</div>
            <div className={styles.trustLogo}>Coldwell Banker</div>
            <div className={styles.trustLogo}>Sotheby's</div>
            <div className={styles.trustLogo}>Keller Williams</div>
          </div>
        </section>

        {/* Features Grid */}
        <section className={styles.featuresSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Everything You Need in One Platform</h2>
            <p className={styles.sectionSubtitle}>Our comprehensive solution handles all aspects of your rental experience</p>
          </div>
          
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section className={styles.servicesSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.divider} />
            <h2 className={styles.sectionTitle}>Premium Services</h2>
            <div className={styles.divider} />
          </div>
          <p className={styles.sectionSubtitle}>We go beyond basic property management to deliver exceptional living experiences</p>
          
          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <ServiceCard 
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
              />
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className={styles.reviewsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>What Our Tenants Say</h2>
            <p className={styles.sectionSubtitle}>Don't just take our word for it - hear from our community</p>
          </div>
          
          <div className={styles.reviewsGrid}>
            {reviews.map((review, index) => (
              <ReviewCard 
                key={index}
                text={review.text}
                name={review.name}
                title={review.title}
                rating={review.rating}
                date={review.date}
              />
            ))}
          </div>
          
          <div className={styles.allReviewsLink}>
            <Link to="/Testimonials" className={styles.linkWithIcon}>
              Read all testimonials <FaArrowRight className={styles.smallArrowIcon} />
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Get Started?</h2>
            <p className={styles.ctaText}>
              Join thousands of happy tenants enjoying stress-free living with TenantEase.
              Get started today and experience the difference.
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/SignUp" className={styles.ctaPrimary}>
                Sign Up
              </Link>
              <Link to="/Contact Us" className={styles.ctaSecondary}>
                Contact Our Team
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerMain}>
            <div className={styles.footerBranding}>
              <div>
                <span className={styles.footerBrandName}>TenantEase</span>
                <p className={styles.footerTagline}>Redefining rental experiences</p>
              </div>
            </div>
            
            <div className={styles.footerMenus}>
              <div className={styles.footerMenu}>
                <h3 className={styles.menuTitle}>Company</h3>
                <nav className={styles.menuLinks}>
                  <Link to="/AboutUs" className={styles.footerLink}>About Us</Link>
                  <Link to="/SignUp" className={styles.footerLink}>Sign Up</Link>
                  <Link to="/Login" className={styles.footerLink}>Sign In</Link>
                  <Link to="/Contact Us" className={styles.footerLink}>Contact Us</Link>
                </nav>
              </div>
              
              <div className={styles.footerMenu}>
                <h3 className={styles.menuTitle}>Resources</h3>
                <nav className={styles.menuLinks}>
                  <Link to="/FAQ" className={styles.footerLink}>FAQ</Link>
                  <Link to="/Guides" className={styles.footerLink}>Renter's Guides</Link>
                  <Link to="/Support" className={styles.footerLink}>Support Center</Link>
                  <Link to="/Community" className={styles.footerLink}>Community</Link>
                </nav>
              </div>
            </div>
            
            <div className={styles.footerContact}>
              <h3 className={styles.menuTitle}>Contact Us</h3>
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <FaPhone className={styles.contactIcon} />
                  <a href='tel:+254796789413'>+254 796 789 413</a>
                </div>
                <div className={styles.contactItem}>
                  <FaEnvelope className={styles.contactIcon} />
                  <a href='mailto:tenantease24@gmail.com'>tenantease24@gmail.com</a>
                </div>
                <div className={styles.contactItem}>
                  <FaClock className={styles.contactIcon} />
                  <span>Mon-Fri: 9AM-6PM</span>
                </div>
              </div>
              
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialLink}>Facebook</a>
                <a href="#" className={styles.socialLink}>Twitter</a>
                <a href="#" className={styles.socialLink}>Instagram</a>
                <a href="#" className={styles.socialLink}>LinkedIn</a>
              </div>
            </div>
          </div>
          
          <div className={styles.footerBottom}>
            <p className={styles.copyright}>© {new Date().getFullYear()} TenantEase. All rights reserved.</p>
            <div className={styles.footerLegal}>
              <Link to="/Privacy" className={styles.legalLink}>Privacy Policy</Link>
              <Link to="/Terms" className={styles.legalLink}>Terms of Service</Link>
              <Link to="/Cookies" className={styles.legalLink}>Cookie Preferences</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;