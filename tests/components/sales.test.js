import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  expect, describe, it,
} from '@jest/globals';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../src/store';
import saleRow from '../../src/components/sales/SaleRow';
import SalesList from '../../src/components/sales/SalesList';
import SaleRow from '../../src/components/sales/SaleRow';

describe('Sales', () => {
  it('Should render sales list page', () => {
    render(
      <Provider store={store}>
        <Router>
          <SalesList />
        </Router>
      </Provider>,
    );

    const pageContent = screen.findByText('Product Name');
    expect(pageContent).toBeDefined();
  });
  it('Should render sales row component', () => {
    render(
      <Provider store={store}>
        <Router>
          <SaleRow />
        </Router>
      </Provider>,
    );

    const pageContent = screen.findByTestId('sale_row');
    expect(pageContent).toBeDefined();
  });
});
