import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Header.css';

const Header = ({ onToggle, onLogin, user, onLogout }) => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const changeLang = (lng) => i18n.changeLanguage(lng);

  const initials = user?.name
    ? user.name.trim().charAt(0).toUpperCase()
    : '?';

  return (
    <header className="header">
      <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
        <h1>{t('header.logo')}</h1>
        <p className="tagline">{t('header.tagline')}</p>
      </Link>

      <nav>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          ☰
        </button>
        <ul className={menuOpen ? 'nav-open' : ''}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>{t('navbar.home')}</Link></li>
          <li><Link to="/services" onClick={() => setMenuOpen(false)}>{t('navbar.services')}</Link></li>
          <li><Link to="/products" onClick={() => setMenuOpen(false)}>{t('navbar.products')}</Link></li>
          <li><Link to="/team" onClick={() => setMenuOpen(false)}>{t('navbar.team')}</Link></li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)}>{t('navbar.contact')}</Link></li>

          <li>
            <button
              onClick={onToggle}
              className="mode-toggle"
              title={t('header.toggleMode')}
              aria-label="Toggle dark mode"
            >
              🌙
            </button>
          </li>

          <li className="lang-switcher">
            <button
              onClick={() => changeLang('en')}
              className={i18n.language === 'en' ? 'active-lang' : ''}
            >
              EN
            </button>
            <button
              onClick={() => changeLang('ar')}
              className={i18n.language === 'ar' ? 'active-lang' : ''}
            >
              AR
            </button>
          </li>

          {user ? (
            <li>
             <div className="user-chip">
                <span className="avatar">{initials}</span>
               <span className="user-name">{user.name}</span>
              <button
                     className="logout-btn"
                     onClick={onLogout}
                    title={t('header.logout')}
                    aria-label={t('header.logout')}
               >
               ⤴
             </button>
            </div>
            </li>
          ) : (
            <li>
              <button className="login-btn" onClick={onLogin}>
                {t('header.login')}
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;