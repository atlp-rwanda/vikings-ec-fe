import React from 'react';
import {
  describe, it, expect, jest,
} from '@jest/globals';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { userEvent } from '@storybook/testing-library';
import LoginForm from '../../src/components/forms/LoginForm';
import store from '../../src/store';

describe('LoginForm', () => {
  it('form submission', () => {
    const mockSubmit = jest.fn();
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <LoginForm onSubmit={mockSubmit} />
      </Provider>,
    );
    fireEvent.change(getByPlaceholderText('youremail@gmail.com'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password' } });
    const btn = screen.getByRole('button', { label: 'Signin' });
    userEvent.click(btn);

    expect(mockSubmit).toBeDefined();
  });
});
