import React from 'react';
import { useTranslation } from 'react-i18next';
import Contact from './Contact';

const ContactPage = ({ user, setShowClientAuth }) => {
  const { t } = useTranslation();

  return (
    <div className="section">
      <h2 style={{ textAlign: 'center' }}>{t('contact.title')}</h2>

      <Contact user={user} setShowClientAuth={setShowClientAuth} />

      <div className="follow-us">
        <h3>{t('contact.followUs')}</h3>
        <div className="follow-icons">
          <a
            href="https://facebook.com/yourbarber"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon facebook"
            aria-label="Facebook"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.45 2.91h-2.33V22c4.78-.79 8.44-4.94 8.44-9.94z"/>
            </svg>
          </a>

          <a
            href="https://instagram.com/yourbarber"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon instagram"
            aria-label="Instagram"
          >
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>

          <a
            href="https://wa.me/212646836380"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon whatsapp"
            aria-label="WhatsApp"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M20.52 3.48A11.87 11.87 0 0 0 12.05 0C5.5 0 .2 5.3.2 11.85c0 2.09.55 4.13 1.6 5.93L0 24l6.4-1.68a11.83 11.83 0 0 0 5.65 1.44h.01c6.54 0 11.85-5.3 11.85-11.85 0-3.17-1.23-6.15-3.39-8.43zM12.06 21.77h-.01a9.86 9.86 0 0 1-5.02-1.38l-.36-.21-3.79.99 1.01-3.7-.23-.38a9.83 9.83 0 0 1-1.5-5.24c0-5.44 4.43-9.86 9.9-9.86 2.64 0 5.12 1.03 6.98 2.9a9.8 9.8 0 0 1 2.89 6.98c0 5.44-4.43 9.9-9.87 9.9zm5.42-7.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.08-.3-.15-1.26-.47-2.4-1.48-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04.99-1.04 2.42 0 1.43 1.06 2.81 1.21 3 .15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;