import React, { useState } from 'react';

const ClientAuth = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const url = isRegister
        ? 'http://localhost:3000/user/register'
        : 'http://localhost:3000/user/login';
      const body = isRegister
        ? { name, email, password }
        : { email, password };
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        // Try to get the real error message from backend
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || 'Login/Register failed');
      }
      const data = await response.json();
      onLogin(data); // Save user info in parent
    } catch (err) {
      setError(err.message || 'Invalid credentials or registration failed');
    }
  };

  return (
    <div className="client-auth section">
      <h2>{isRegister ? 'Register' : 'Client Login'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <div>
            <label>Name:</label>
            <input value={name} onChange={e => setName(e.target.value)} required />
          </div>
        )}
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
      </form>
      <button onClick={() => setIsRegister(!isRegister)} style={{ marginTop: '1em' }}>
        {isRegister ? 'Already have an account? Login' : 'No account? Register'}
      </button>
    </div>
  );
};

export default ClientAuth;