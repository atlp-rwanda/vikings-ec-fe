import React from 'react';
import userEvent, {
  render, fireEvent, screen, act,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import configureStore from 'redux-mock-store';
import {
  describe, beforeEach, it, expect, jest,
} from '@jest/globals';
import thunk from 'redux-thunk';
import Account from '../../src/components/profile/Account';
import Address from '../../src/components/profile/Address';
import { updateProfile } from '../../src/features/profile/updateProfileSlice';

jest.mock('../../src/features/profile/updateProfileSlice', () => ({
  updateProfile: jest.fn(),
}));

const mockStore = configureStore([thunk]);

describe('Account component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      updateProfile: {
        ui: {
          avatar: null,
        },
      },
    });
  });

  it('renders form fields and save button', () => {
    const data = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      gender: 'male',
      birthdate: '1990-01-01',
      phone: '1234567890',
      avatar: null,
    };
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <Account data={data} />
      </Provider>,
    );
    const firstnameInput = getByLabelText('First name');
    expect(firstnameInput).toBeInTheDocument();
  });
});
describe('Address component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      updateProfile: {
        ui: {
          avatar: null,
        },
      },
    });
  });

  it('renders form fields and save button', async () => {
    const data = {
      billingAddress: {
        country: 'United States',
        state: 'California',
        province: '',
        city: 'San Francisco',
        streetAddress: '123 Main St',
        zipCode: '12345',
      },
    };
    const { getByLabelText } = render(
      <Provider store={store}>
        <Address data={data} />
      </Provider>,
    );
    const countryInput = getByLabelText('Country');
    expect(countryInput).toBeInTheDocument();
  });
});
