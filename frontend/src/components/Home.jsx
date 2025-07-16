import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './components.css';

const Home = () => {
  const { t } = useTranslation();
  return (
    <div className="home-hero">
      <div className="hero-content">
        <h1 className="main-logo-title">
          <span role="img" aria-label="Barber" style={{fontSize: '2.5rem', verticalAlign: 'middle'}}>💈</span>
          <span style={{marginLeft: '0.5rem', color: '#bfa76a', fontWeight: 700, fontFamily: 'Playfair Display, serif'}}>LineUp Barber</span>
        </h1>
        <p className="hero-subtitle" style={{fontSize: '1.5rem', fontWeight: 500, marginTop: '1rem'}}>
          {t('home.heroTitle')}
        </p>
        <p className="hero-marketing">
          {t('home.heroMarketing')}
        </p>
        <Link to="/services" className="hero-btn">
          {t('home.bookBtn')}
        </Link>
      </div>
      <div className="home-cards">
        <div className="home-card">
          <span className="home-icon" style={{ color: '#bfa76a' }}>✂️</span>
          <h3>{t('home.servicesCardTitle')}</h3>
          <p>{t('home.servicesCardDesc')}</p>
          <Link to="/services" className="card-link">{t('home.servicesCardLink')}</Link>
        </div>
        <div className="home-card">
          <span className="home-icon" style={{ color: '#23272f' }}>🛒</span>
          <h3>{t('home.productsCardTitle')}</h3>
          <p>{t('home.productsCardDesc')}</p>
          <Link to="/products" className="card-link">{t('home.productsCardLink')}</Link>
        </div>
        <div className="home-card">
          <span className="home-icon" style={{ color: '#bfa76a' }}>👨‍🔧</span>
          <h3>{t('home.teamCardTitle')}</h3>
          <p>{t('home.teamCardDesc')}</p>
          <Link to="/team" className="card-link">{t('home.teamCardLink')}</Link>
        </div>
        <div className="home-card">
          <span className="home-icon" style={{ color: '#23272f' }}>📍</span>
          <h3>{t('home.contactCardTitle')}</h3>
          <p>{t('home.contactCardDesc')}</p>
          <Link to="/contact" className="card-link">{t('home.contactCardLink')}</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;