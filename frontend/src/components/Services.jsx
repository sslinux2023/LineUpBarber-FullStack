import React, { useEffect, useState } from 'react';
import './components.css';

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/services')
      .then(res => res.json())
      .then(data => setServices(data));
  }, []);

  return (
    <div className="section services">
      <h2>Our Services</h2>
      <ul>
        {services.map(service => (
          <li key={service.id}>
            <h3>{service.name}</h3>
            <p>{service.price} DH</p>
             {service.imageUrl && (
            <img src={service.imageUrl} alt={service.name} style={{width: 120, borderRadius: 8}} />
          )}
          {service.description && <p>{service.description}</p>}

          </li>
        ))}
      </ul>
    </div>
  );
};

export default Services;