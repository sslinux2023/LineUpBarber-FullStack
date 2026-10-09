import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const WA_NUMBER = '212646836380';

const Contact = ({ user, setShowClientAuth }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const preselectedService = location.state?.serviceName || '';
  const isAr = i18n.language === 'ar';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState(user?.name || '');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!user) {
      setShowClientAuth(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          date: new Date(date).toISOString(),
          serviceName: preselectedService || undefined,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || t('contact.errorMsg'));
      }

      const prettyDate = new Date(date).toLocaleString(
        isAr ? 'ar-MA' : 'fr-MA',
        { dateStyle: 'full', timeStyle: 'short' }
      );

      window.dispatchEvent(
        new CustomEvent('toast', {
          detail: {
            type: 'success',
            text: preselectedService
              ? `✓ ${t('contact.successWithService', { service: preselectedService, date: prettyDate })}`
              : `✓ ${t('contact.successMsg', { name, date: prettyDate })}`,
          },
        })
      );

      setName(user?.name || '');
      setDate('');
    } catch (err) {
      setError(err.message || t('contact.errorMsg'));
      window.dispatchEvent(
        new CustomEvent('toast', {
          detail: { type: 'error', text: err.message || t('contact.errorMsg') },
        })
      );
    } finally {
      setLoading(false);
    }
  };

  // Build the WhatsApp message with the current form data
  const buildWhatsAppLink = () => {
    const lines = isAr
      ? [
          'مرحبًا LineUp Barber 👋',
          '',
          'أرغب في حجز موعد.',
          name ? `الاسم: ${name}` : '',
          date ? `التاريخ: ${new Date(date).toLocaleString('ar-MA')}` : '',
          preselectedService ? `الخدمة: ${preselectedService}` : '',
          '',
          'شكرًا!',
        ]
      : [
          'Hello LineUp Barber 👋',
          '',
          "I'd like to book an appointment.",
          name ? `Name: ${name}` : '',
          date ? `Date: ${new Date(date).toLocaleString('fr-MA')}` : '',
          preselectedService ? `Service: ${preselectedService}` : '',
          '',
          'Thank you!',
        ];

    const text = lines.filter(Boolean).join('\n');
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="contact">
      <h2>{t('contact.title')}</h2>
      <p className="section-subtitle">{t('contact.subtitle')}</p>

      {preselectedService && (
        <div className="booking-banner">
          <strong>{t('contact.bookingFor')}:</strong> {preselectedService}
        </div>
      )}

      {error && <div className="auth-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="name">{t('contact.nameLabel')}</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('contact.namePlaceholder')}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="appointment">{t('contact.dateLabel')}</label>
          <input
            id="appointment"
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="auth-submit" disabled={loading}>
          {loading ? t('contact.booking') : t('contact.bookNow')}
        </button>

        <a
          href={buildWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-book-btn"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
            <path d="M20.52 3.48A11.87 11.87 0 0 0 12.05 0C5.5 0 .2 5.3.2 11.85c0 2.09.55 4.13 1.6 5.93L0 24l6.4-1.68a11.83 11.83 0 0 0 5.65 1.44h.01c6.54 0 11.85-5.3 11.85-11.85 0-3.17-1.23-6.15-3.39-8.43zM12.06 21.77h-.01a9.86 9.86 0 0 1-5.02-1.38l-.36-.21-3.79.99 1.01-3.7-.23-.38a9.83 9.83 0 0 1-1.5-5.24c0-5.44 4.43-9.86 9.9-9.86 2.64 0 5.12 1.03 6.98 2.9a9.8 9.8 0 0 1 2.89 6.98c0 5.44-4.43 9.9-9.87 9.9zm5.42-7.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.08-.3-.15-1.26-.47-2.4-1.48-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04.99-1.04 2.42 0 1.43 1.06 2.81 1.21 3 .15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z"/>
          </svg>
          <span>{t('contact.orWhatsApp')}</span>
        </a>
      </form>

      <p className="contact-phone">
        {t('contact.phoneLabel')}: +212 646 836 380
      </p>
    </div>
  );
};

export default Contact;