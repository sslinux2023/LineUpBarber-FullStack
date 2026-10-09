import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './components.css';

const Products = ({ onAddToCart }) => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = (product) => {
    onAddToCart(product);
    window.dispatchEvent(
      new CustomEvent('toast', {
        detail: {
          type: 'success',
          text: `✓ ${t('cart.addedToast')} — ${
            isAr ? product.nameAr || product.name : product.name
          }`,
        },
      })
    );
  };

  return (
    <div className="products-page">
      <header className="products-header">
        <h2>{t('products.title')}</h2>
        <p className="section-subtitle">{t('products.subtitle')}</p>
      </header>

      {loading && <p className="products-status">{t('products.loading')}</p>}

      {!loading && products.length === 0 && (
        <p className="products-status">{t('products.empty')}</p>
      )}

      {!loading && products.length > 0 && (
        <div className="products-grid">
          {products.map((prod) => {
            const name = isAr ? prod.nameAr || prod.name : prod.name;
            const description = isAr
              ? prod.descriptionAr || prod.description
              : prod.description;

            return (
              <article className="product-card" key={prod.id}>
                <div className="product-card-media">
                  {prod.imageUrl && (
                    <img src={prod.imageUrl} alt={name} loading="lazy" />
                  )}
                  <span className="product-price-badge">
                    {prod.price} {t('products.price')}
                  </span>
                </div>

                <div className="product-card-body">
                  <h3 className="product-card-title">{name}</h3>
                  {description && (
                    <p className="product-card-desc">{description}</p>
                  )}
                </div>

                <button
                  type="button"
                  className="product-card-btn"
                  onClick={() => handleAdd(prod)}
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
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  {t('products.addToCart')}
                </button>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Products;
