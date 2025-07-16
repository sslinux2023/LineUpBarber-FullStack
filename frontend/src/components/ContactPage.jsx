import React from 'react';
import Contact from './Contact';

const ContactPage = ({ user, setShowClientAuth }) => (
  <div className="section">
    <h2>Contact Us</h2>
    <Contact user={user} setShowClientAuth={setShowClientAuth} />
    <div style={{ marginTop: '2em' }}>
      <h3>Follow us</h3>
      <a href="https://facebook.com/yourbarber" target="_blank" rel="noopener noreferrer">Facebook</a> |{' '}
      <a href="https://instagram.com/yourbarber" target="_blank" rel="noopener noreferrer">Instagram</a> |{' '}
      <a href="https://wa.me/212646836380" target="_blank" rel="noopener noreferrer">WhatsApp</a>
    </div>
  </div>
);

export default ContactPage;