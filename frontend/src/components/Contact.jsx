import React, { useState } from 'react';

const Contact = ({ user, setShowClientAuth }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!user) {
      setShowClientAuth(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: e.target.name.value,
          date: new Date(e.target.appointment.value).toISOString(), // ISO format
        }),
      });

      if (!response.ok) throw new Error('Booking failed');
      
      alert('Appointment booked successfully!');
      e.target.reset();
    } catch (err) {
      setError('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact section">
      <h2>Contact</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label><br />
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="appointment">Appointment Date:</label><br />
          <input type="datetime-local" id="appointment" name="appointment" required />
        </div>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Booking...' : 'Book Now'}
        </button>
      </form>
      <p>Phone: +212646836380</p>
    </div>
  );
};

export default Contact;