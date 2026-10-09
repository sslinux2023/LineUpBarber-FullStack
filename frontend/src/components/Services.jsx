import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './components.css';

const Services = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/services')
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, []);

  const handleBook = (service) => {
    navigate('/contact', { state: { serviceName: service.name } });
  };

  return (
    <div className="services-page">
      <header className="services-header">
        <h2>{t('services.title')}</h2>
        <p className="section-subtitle">{t('services.subtitle')}</p>
      </header>

      {loading && <p className="services-status">{t('services.loading')}</p>}

      {!loading && services.length === 0 && (
        <p className="services-status">{t('services.empty')}</p>
      )}

      {!loading && services.length > 0 && (
        <div className="services-grid">
          {services.map((service) => {
            const name = isAr ? service.nameAr || service.name : service.name;
            const description = isAr
              ? service.descriptionAr || service.description
              : service.description;

            return (
              <article className="service-card" key={service.id}>
                <div className="service-card-media">
                  {service.imageUrl && (
                    <img src={service.imageUrl} alt={name} loading="lazy" />
                  )}
                  <span className="service-price-badge">
                    {service.price} {t('services.price')}
                  </span>
                </div>

                <div className="service-card-body">
                  <h3 className="service-card-title">{name}</h3>
                  {description && (
                    <p className="service-card-desc">{description}</p>
                  )}
                </div>

                <button
                  type="button"
                  className="service-card-btn"
                  onClick={() => handleBook(service)}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {t('services.bookThisService')}
                </button>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Services;
