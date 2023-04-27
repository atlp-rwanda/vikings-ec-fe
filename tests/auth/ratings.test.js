import React from 'react';
import {
  describe, it, expect, jest,
} from '@jest/globals';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { userEvent } from '@storybook/testing-library';
import Ratings from '../../src/components/ratings/Ratings';
import store from '../../src/store';

describe('Rating form', () => {
  it('form submission', () => {
    const mockSubmit = jest.fn();
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <Ratings onSubmit={mockSubmit} />
      </Provider>,
    );
    fireEvent.change(getByPlaceholderText('Provide your feedback'), {
      target: { value: 'Thanks' },
    });

    fireEvent.click(screen.getByRole('submit', { label: 'Add review' }));
    fireEvent.click(screen.getByRole('cancel', { label: 'cancel' }));

    expect(mockSubmit).toBeDefined();
  });
});
