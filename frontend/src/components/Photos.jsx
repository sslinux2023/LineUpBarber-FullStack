import React from 'react';
import '../components/components.css';

const Photos = () => {
  return (
    <div className="section photos-grid">
      <h2>Photos</h2>
      <img src="/src/assets/photo1.jpg" alt="Haircut 1" />
      <img src="/src/assets/photo2.jpg" alt="Haircut 2" />
    </div>
  );
};

export default Photos;