import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect, describe, it } from '@jest/globals';
import PaymentSuccessPage from '../../../src/pages/payment/PaymentSuccessPage';

const mockStore = configureStore([thunk]);
describe('PaymentSuccessPage', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      order: {
        data: null,
        isLoading: false,
      },
    });
  });
  it('renders loader when isLoading is true', () => {
    render(
      <Provider store={store}>
        <PaymentSuccessPage />
      </Provider>,

    );
    expect(screen.getByTestId('success-payment')).toBeInTheDocument();
  });
});
