import React, { useEffect, useState } from 'react';

const Products = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(res => res.json())
      .then(setProducts);
  }, []);

  return (
    <div className="section products">
      <h2>Our Products</h2>
      <ul>
        {products.map(prod => (
          <li key={prod.id}>
            <strong>{prod.name}</strong> - {prod.price} DH
            <p>{prod.description}</p>
            {prod.imageUrl && <img src={prod.imageUrl} alt={prod.name} style={{width: 100}} />}
            <button onClick={() => onAddToCart(prod)}>
              <span role="img" aria-label="Add to cart">🛒</span> Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;