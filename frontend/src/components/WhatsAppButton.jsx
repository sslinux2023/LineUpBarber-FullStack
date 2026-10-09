import React from 'react';
import { useTranslation } from 'react-i18next';

const WA_NUMBER = '212646836380'; // +212 646 836 380 without spaces or +

const WhatsAppButton = () => {
  const { t, i18n } = useTranslation();

  const message =
    i18n.language === 'ar'
      ? 'مرحبًا! أرغب في الحصول على مزيد من المعلومات.'
      : 'Hello! I would like more information.';

  const href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float-btn"
      aria-label={t('whatsapp.label')}
      title={t('whatsapp.label')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="26"
        height="26"
        fill="currentColor"
      >
        <path d="M16 3C8.82 3 3 8.82 3 16c0 2.29.6 4.43 1.65 6.29L3 29l6.94-1.61A12.93 12.93 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3zm0 23.6c-1.98 0-3.82-.53-5.4-1.45l-.39-.23-4.12.96.99-4.01-.25-.4a10.6 10.6 0 0 1-1.63-5.47c0-5.86 4.77-10.62 10.8-10.62 5.86 0 10.62 4.76 10.62 10.62S21.86 26.6 16 26.6zm5.85-7.98c-.32-.16-1.9-.94-2.2-1.04-.3-.11-.51-.16-.73.16-.21.32-.83 1.04-1.02 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.55-.08-.16-.73-1.75-1-2.4-.26-.63-.53-.55-.73-.55h-.62c-.21 0-.55.08-.84.4-.29.32-1.1 1.07-1.1 2.61 0 1.54 1.13 3.03 1.29 3.24.16.21 2.22 3.39 5.38 4.75.75.32 1.34.51 1.79.66.75.24 1.44.21 1.98.13.61-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.13-.29-.21-.61-.37z" />
      </svg>
      <span className="whatsapp-tooltip">{t('whatsapp.tooltip')}</span>
    </a>
  );
};

export default WhatsAppButton;
