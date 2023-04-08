import React from 'react';
import ProductOperationButton from '../../../src/components/products/ProductOperationButton';

const mockProduct = {
  product: {
    name: 'product name',
    images: ['product-image.jpg', 'product-image1.jpg'],
    price: 100,
    quantity: 1,
    id: '12345',
  },
  editBTN: <button>Edit</button>,
  deleteBTN: <button>Delete</button>,
  addCart: <button>Add to Cart</button>,
  viewSingleProduct: jest.fn(),
};

export const mockProps = {
  product: {
    name: 'Test Product',
    images: 'test-image1.jpg',
    price: 100,
    quantity: 10,
  },
  editBTN: <button>Edit</button>,
  deleteBTN: <button>Delete</button>,
  switchCurrentImage: jest.fn(),
};

export const mockProductsWithWishBtn = {
  product: {
    name: 'product name',
    images: ['product-image.jpg', 'product-image1.jpg'],
    price: 100,
    quantity: 1,
    id: '12345',
  },
  wish: <ProductOperationButton title="Wish product" alt="wish" />,
  switchCurrentImage: jest.fn(),
};

export default mockProduct;
