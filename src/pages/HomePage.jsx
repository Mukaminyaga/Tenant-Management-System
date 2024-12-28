import React from 'react';
import NavigationComponent from '../components/HomePageComponents/nav';
import './HomePage.css';
import image from './building.jpg';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="landingpage">
      <NavigationComponent />
      <header className="hero-section">
        <div className="hero-content">
          <h1>Making it feel more like <span>home</span></h1>
          <p>
            A simple experience to communicate and process rent payment easily at absolutely no cost.
          </p>
          <div className="stats">
            <div>
              <h2><span className="text">100</span>+</h2>
              <p>Tenants</p>
            </div>
            <div>
              <h2><span className="text">90</span>+</h2>
              <p>Properties</p>
            </div>
            <div>
              <h2><span className="text">7</span>+</h2>
              <p>Years in Business</p>
            </div>
          </div>
          <Link to='/Signup' className="get-started">GET STARTED</Link>
        </div>
        <div className="hero-image">
          <img src={image} alt="Building" />
        </div>
      </header>

      <section className="services-section">
        <h2>Our Services</h2>
        <div className="services-timeline">
          <div className="service-card">
            <h3>Premium Homes</h3>
            <p>
              Experience luxury living at our executive homes, where modern elegance meets convenience.
            </p>
          </div>
          <div className="service-card">
            <h3>Luxury Amenities</h3>
            <p>
              We offer luxury amenities and services designed to enhance your living experience.
            </p>
          </div>
          <div className="service-card">
            <h3>Top-notch security</h3>
            <p>
              Enjoy peace of mind with round-the-clock security, featuring state-of-the-art surveillance cameras.
            </p>
          </div>
          <div className="service-card">
            <h3>High-speed Internet</h3>
            <p>
              Experience fast, reliable internet connectivity designed to support both personal and professional needs seamlessly.
            </p>
          </div>
        </div>
      </section>

      <section className="reviews-section">
        <h2 className="text-center">Verified Reviews</h2>
        <div className="reviews-container">
          <div className="review-card">
            <p>Best decision I have made. I cannot recommend Haven Heights enough</p>
            <footer>
              <strong>Name</strong> <span>Title</span>
            </footer>
          </div>
          <div className="review-card">
            <p>"Outstanding service and seamless experience!"</p>
            <footer>
              <strong>Name</strong> <span>Title</span>
            </footer>
          </div>
          <div className="review-card">
            <p>Best decision I have made. I cannot recommend <em>company name</em> enough</p>
            <footer>
              <strong>Name</strong> <span>Title</span>
            </footer>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <h3>Tenant Hub</h3>
          <ul className="quick-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Our Services</a></li>
            <li><a href="/signin">Sign in</a></li>
          </ul>
          <ul className="contact-info">
            <li><a href="tel:+254759191326">call us</a></li>
            <li><a href="mailto:neemaogao@gmail.com">email@gmail.com</a></li>
          </ul>
        </div>
        <p>Tenant Street | All rights reserved</p>
      </footer>
    </div>
  );
};

export default HomePage;
