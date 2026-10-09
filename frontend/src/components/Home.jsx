import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './components.css';

const Home = () => {
  const { t } = useTranslation();

  const cards = [
    {
      icon: '✂️',
      title: t('home.servicesCardTitle'),
      desc: t('home.servicesCardDesc'),
      link: '/services',
      linkLabel: t('home.servicesCardLink'),
    },
    {
      icon: '🛒',
      title: t('home.productsCardTitle'),
      desc: t('home.productsCardDesc'),
      link: '/products',
      linkLabel: t('home.productsCardLink'),
    },
    {
      icon: '👨‍🔧',
      title: t('home.teamCardTitle'),
      desc: t('home.teamCardDesc'),
      link: '/team',
      linkLabel: t('home.teamCardLink'),
    },
    {
      icon: '📍',
      title: t('home.contactCardTitle'),
      desc: t('home.contactCardDesc'),
      link: '/contact',
      linkLabel: t('home.contactCardLink'),
    },
  ];

  return (
    <div className="home-page">
      {/* ─── HERO ─── */}
      <section className="home-hero">
        <div className="home-hero-inner">
          <h1 className="home-hero-title">
            <span className="home-hero-icon" role="img" aria-label="Barber">
              💈
            </span>
            <span className="home-hero-brand">{t('header.logo')}</span>
          </h1>

          <p className="home-hero-subtitle">{t('home.heroTitle')}</p>
          <p className="home-hero-marketing">{t('home.heroMarketing')}</p>

          <Link to="/services" className="home-hero-btn">
            {t('home.bookBtn')}
          </Link>
        </div>
      </section>

      {/* ─── FEATURE CARDS ─── */}
      <section className="home-cards">
        {cards.map((card) => (
          <Link to={card.link} className="home-card" key={card.title}>
            <span className="home-card-icon" aria-hidden="true">
              {card.icon}
            </span>
            <h3 className="home-card-title">{card.title}</h3>
            <p className="home-card-desc">{card.desc}</p>
            <span className="home-card-link">{card.linkLabel} →</span>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Home;
