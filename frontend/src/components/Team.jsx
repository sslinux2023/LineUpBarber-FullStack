import React from 'react';
import './components.css';

const Team = () => (
  <div className="section team-grid">
    <div className="team-member">
      <img src="/src/assets/photo1.jpg" alt="Soufiane" />
      <h3>Soufiane</h3>
      <p>Director & Barber</p>
      <p>⭐⭐⭐⭐⭐</p>
    </div>
    <div className="team-member">
      <img src="/src/assets/photo2.jpg" alt="Bilal" />
      <h3>Bilal</h3>
      <p>Barber</p>
      <p>⭐⭐⭐⭐</p>
    </div>
  </div>
);

export default Team;