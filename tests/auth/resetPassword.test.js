import React from 'react';
import {
  describe, it, expect, jest,
} from '@jest/globals';
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { userEvent } from '@storybook/testing-library';
import { renderPath } from '../jest.setup';

describe('Reset password form', () => {
  it('form submission', async () => {
    const mockSubmit = jest.fn();
    const renderer = renderPath('/auth/reset-password?token="some');
    fireEvent.change(renderer.getByPlaceholderText('New password'), {
      target: { value: 'Password@100' },
    });
    fireEvent.change(renderer.getByPlaceholderText('Confirm password'), { target: { value: 'Password@100' } });
    const btn = screen.getByRole('submit');
    userEvent.click(btn);

    expect(mockSubmit).toBeDefined();
  });
});
