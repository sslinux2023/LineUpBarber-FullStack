import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ClientAuth = ({ onLogin, onClose }) => {
  const { t } = useTranslation();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        // 1. Register
        const regRes = await fetch('http://localhost:3000/user/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });
        if (!regRes.ok) {
          const errData = await regRes.json().catch(() => ({}));
          throw new Error(errData.message || 'Registration failed');
        }

        // 2. Immediately log in with the same credentials
        const loginRes = await fetch('http://localhost:3000/user/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        if (!loginRes.ok) {
          const errData = await loginRes.json().catch(() => ({}));
          throw new Error(errData.message || 'Login after register failed');
        }
        const data = await loginRes.json();
        onLogin(data);
        window.dispatchEvent(
          new CustomEvent('toast', {
            detail: { type: 'success', text: `✓ ${t('auth.successMsg')}` },
          })
        );
      } else {
        // Login
        const res = await fetch('http://localhost:3000/user/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || t('auth.errorMsg'));
        }
        const data = await res.json();
        onLogin(data);
        window.dispatchEvent(
          new CustomEvent('toast', {
            detail: { type: 'success', text: `✓ ${t('auth.successMsg')}` },
          })
        );
      }
    } catch (err) {
      setError(err.message || t('auth.errorMsg'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" onClick={onClose} aria-label="Close">✕</button>

        <h2>{isRegister ? t('auth.registerTitle') : t('auth.loginTitle')}</h2>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="field">
              <label>{t('auth.name')}</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>
          )}

          <div className="field">
            <label>{t('auth.email')}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="field">
            <label>{t('auth.password')}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={isRegister ? 'new-password' : 'current-password'}
            />
          </div>

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading
              ? t('auth.loading')
              : isRegister
              ? t('auth.register')
              : t('auth.submit')}
          </button>
        </form>

        <button
          type="button"
          className="auth-switch"
          onClick={() => {
            setIsRegister(!isRegister);
            setError('');
          }}
        >
          {isRegister ? t('auth.haveAccount') : t('auth.noAccount')}
        </button>
      </div>
    </div>
  );
};

export default ClientAuth;