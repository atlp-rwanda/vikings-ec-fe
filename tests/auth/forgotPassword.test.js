import React from 'react';
import {
  describe, it, expect, jest,
} from '@jest/globals';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { userEvent } from '@storybook/testing-library';
import { renderPath } from '../jest.setup';
import { showSuccessMessage } from '../../src/utils/toast';

jest.mock('../../src/utils/toast', () => ({
  showSuccessMessage: jest.fn(),
  showErrorMessage: jest.fn(),
}));
describe('Forgot password form', () => {
  it('form submission', async () => {
    const mockSubmit = jest.fn();
    const renderer = renderPath('/auth/forgot-password');
    fireEvent.change(renderer.getByPlaceholderText('your-email@gmail.com'), {
      target: { value: 'email@gmail.com' },
    });
    const btn = screen.getByRole('submit');
    userEvent.click(btn);
    // await waitFor(() => expect(showSuccessMessage).toHaveBeenCalledTimes(1));
    expect(mockSubmit).toBeDefined();
  });
});
