import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './components.css';

const CartWidget = ({ cart, onRemove, onCheckout, checkingOut }) => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [open, setOpen] = useState(false);

  if (!cart || cart.length === 0) return null;

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      {/* Floating button — always visible */}
      <button
        className="cart-float-btn"
        onClick={() => setOpen(!open)}
        aria-label={t('cart.viewCart')}
      >
        🛒
        <span className="cart-float-count">{cart.length}</span>
        <span className="cart-float-total">{total} {isAr ? 'درهم' : 'DH'}</span>
      </button>

      {/* Slide-in panel */}
      <div className={`cart-panel ${open ? 'open' : ''}`}>
        <div className="cart-panel-header">
          <h3>{t('cart.title')}</h3>
          <button className="cart-close-btn" onClick={() => setOpen(false)}>✕</button>
        </div>

        <ul className="cart-items">
          {cart.map((item, idx) => {
            const name = isAr ? (item.nameAr || item.name) : item.name;
            return (
              <li key={idx} className="cart-item">
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={name} className="cart-item-img" />
                )}
                <div className="cart-item-info">
                  <p className="cart-item-name">{name}</p>
                  <p className="cart-item-price">{item.price} {isAr ? 'درهم' : 'DH'}</p>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => onRemove(idx)}
                  aria-label={t('cart.remove')}
                >
                  ✕
                </button>
              </li>
            );
          })}
        </ul>

        <div className="cart-footer">
          <div className="cart-total-row">
            <span>{t('cart.total')}</span>
            <strong>{total} {isAr ? 'درهم' : 'DH'}</strong>
          </div>
          <button
            className="btn-primary cart-checkout-btn"
            onClick={onCheckout}
            disabled={checkingOut}
          >
            {checkingOut ? t('cart.checkingOut') : t('cart.checkout')}
          </button>
        </div>
      </div>
    </>
  );
};

export default CartWidget;
