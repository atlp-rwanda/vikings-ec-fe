import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  expect, describe, it,
} from '@jest/globals';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../src/store';
import OrderRow from '../../src/components/orders/OrderRow';
import BuyerOrders from '../../src/components/orders/BuyerOrders'
import SingleOrderCard from '../../src/components/orders/SingleOrderCard';
import {SingleOrderProduct} from '../../src/components/orders/SingleOrderProduct';

describe('orders', () => {
  it('Should render orders page', () => {
    render(
      <Provider store={store}>
        <Router>
          <BuyerOrders />
        </Router>
      </Provider>,
    );

    const pageContent = screen.findByText('order id');
    expect(pageContent).toBeDefined();
  });
  it('Should render order row component', () => {
    render(
      <Provider store={store}>
        <Router>
          <OrderRow />
        </Router>
      </Provider>,
    );

    const pageContent = screen.findByTestId('view');
    expect(pageContent).toBeDefined();
  });
  it('Should render order card component', () => {
    render(
      <Provider store={store}>
        <Router>
          <SingleOrderCard />
        </Router>
      </Provider>,
    );

    const pageContent = screen.findByTestId('Total:');
    expect(pageContent).toBeDefined();
  });
  it('Should render order card component', () => {
    render(
      <Provider store={store}>
        <Router>
          <SingleOrderProduct />
        </Router>
      </Provider>,
    );

    const pageContent = screen.findByTestId('product-name');
    expect(pageContent).toBeDefined();
  });
});