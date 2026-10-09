import React, { useEffect, useState } from 'react';
import './components.css';

const Toast = () => {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      setToast(e.detail);
      const timeout = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timeout);
    };
    window.addEventListener('toast', handler);
    return () => window.removeEventListener('toast', handler);
  }, []);

  if (!toast) return null;

  return (
    <div className={`toast toast-${toast.type}`}>
      {toast.text}
      <button className="toast-close" onClick={() => setToast(null)}>✕</button>
    </div>
  );
};

export default Toast;
