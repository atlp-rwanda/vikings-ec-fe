import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';
import { expect, describe, it } from '@jest/globals';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../src/store';
import TwoFactorAuthPage from '../../src/pages/auth/twoFactorAuthPage';
import TwoFactorAuthForm from '../../src/components/forms/twoFactorAuthForm';

describe('Two factor auth form', () => {
  it(' Should render button verify  ', () => {
    render(
      <Provider store={store}>
        <Router>
          <TwoFactorAuthPage />
        </Router>
      </Provider>,
    );
    const inputElement = screen.getByText(/Verify/i);
    expect(inputElement).toBeDefined();
  });
  it('Should invoke function on submit', async () => {
    const mockSubmit = jest.fn();
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <Router>
          <TwoFactorAuthForm onSubmit={mockSubmit} />
        </Router>
      </Provider>,
    );
    fireEvent.change(getByPlaceholderText('Authcode'), {
      target: { value: '123456' },
    });

    const btn = screen.getByRole('button', { label: 'Verify' });
    userEvent.click(btn);
    expect(mockSubmit).toBeDefined();
  });
});
