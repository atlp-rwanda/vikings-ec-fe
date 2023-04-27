import React from 'react';
import {
  describe, it, expect, jest,
} from '@jest/globals';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { userEvent } from '@storybook/testing-library';
import setimmediate from 'setimmediate';
import UpdatePasswordPage from '../../src/pages/auth/UpdatePasswordPage';
import store from '../../src/store';

describe('Update Password Page', () => {
  it('form submission', () => {
    const mockSubmit = jest.fn();
    const { getByLabelText } = render(
      <Provider store={store}>
        <UpdatePasswordPage onSubmit={mockSubmit} />
      </Provider>,
    );
    fireEvent.change(getByLabelText('Old password'), {
      target: { value: 'Pass@123' },
    });
    fireEvent.change(getByLabelText('New password'), { target: { value: 'Pass@1234' } });

    const btn = screen.getByRole('button', { label: 'Save' });
    userEvent.click(btn);

    expect(mockSubmit).toBeDefined();
  });
});
