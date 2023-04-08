import React from 'react';
import ProductCard from '../components/products/ProductCard';

export default {
  title: 'Component/ProductCard',
  component: ProductCard,
  argTypes: {
    name: {
      control: 'text',
      defaultValue: 'Product Name',
    },
    image: {
      control: 'text',
      defaultValue: 'http://res.cloudinary.com/djg7yg23y/image/upload/v1676800915/projects/ecommerce/f258e7aa-b540-469d-b866-fd13747c81ce_1676800912.287.webp',
    },
    price: {
      control: 'number',
      defaultValue: 100,
    },
    editBTN: {
      control: 'boolean',
      defaultValue: true,
    },
    deleteBTN: {
      control: 'boolean',
      defaultValue: true,
    },
    wish: {
      control: 'boolean',
      defaultValue: false,
    },
    addCart: {
      control: 'boolean',
      defaultValue: false,
    },
    id: {
      control: 'text',
      defaultValue: '6717e8c7-c058-4670-90c3-5c8953cc844a',
    },
    viewSingleProduct: {
      action: 'viewSingleProduct',
    },
    quantity: {
      control: 'number',
      defaultValue: 5,
    },
  },
};

const Template = (args) => <ProductCard {...args} />;

export const Default = Template.bind({});

Default.args = {
  product: {
    name: 'Shyamns',
    images: ['http://res.cloudinary.com/djg7yg23y/image/upload/v1680876220/projects/ecommerce/e2b4577d-2e6c-4aff-a413-3de8ee0f156c_1680876215.787.jpg'],
    price: 100,
    editBTN: true,
    deleteBTN: true,
    wish: false,
    addCart: false,
    id: '1',
    quantity: 1,
  }
};
