import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Header.css';

const Header = ({ onToggle, onLogin }) => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const changeLang = (lng) => i18n.changeLanguage(lng);

  return (
    <header className="header">
      <div className="logo">
        <h1>{t('header.logo')}</h1>
        <p className="tagline">{t('header.tagline')}</p>
      </div>
      <nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
        <ul className={menuOpen ? 'nav-open' : ''}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>{t('navbar.home')}</Link></li>
          <li><Link to="/services" onClick={() => setMenuOpen(false)}>{t('navbar.services')}</Link></li>
          <li><Link to="/products" onClick={() => setMenuOpen(false)}>{t('navbar.products')}</Link></li>
          <li><Link to="/team" onClick={() => setMenuOpen(false)}>{t('navbar.team')}</Link></li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)}>{t('navbar.contact')}</Link></li>
          <li>
            <button onClick={onToggle} className="mode-toggle" title={t('header.toggleMode')} aria-label="Toggle dark mode">
              <span role="img" aria-label="Dark mode">🌙</span>
            </button>
          </li>
          <li className="lang-switcher">
            <button
              onClick={() => changeLang('en')}
              className={i18n.language === 'en' ? 'active-lang' : ''}
              style={{fontWeight: i18n.language === 'en' ? 'bold' : 'normal'}}
            >EN</button>
            <button
              onClick={() => changeLang('ar')}
              className={i18n.language === 'ar' ? 'active-lang' : ''}
              style={{fontWeight: i18n.language === 'ar' ? 'bold' : 'normal'}}
            >AR</button>
          </li>
          <li>
            <button className="login-btn" onClick={onLogin}>{t('header.login')}</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;