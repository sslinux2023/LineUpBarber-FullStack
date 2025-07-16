import React from 'react';
import Products from './Products';

const ProductPage = ({ onAddToCart }) => (
  <div className="section">
    <h2>All Products</h2>
    <Products onAddToCart={onAddToCart} />
  </div>
);

export default ProductPage;