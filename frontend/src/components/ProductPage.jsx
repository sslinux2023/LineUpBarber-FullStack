import React from 'react';
import Products from './Products';

const ProductPage = ({ onAddToCart }) => (
  <div className="section">
    <Products onAddToCart={onAddToCart} />
  </div>
);

export default ProductPage;
