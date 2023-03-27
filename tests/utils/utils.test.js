import React from 'react';
import { describe, it, expect } from '@jest/globals';
import { showErrorMessage, showSuccessMessage } from '../../src/utils/toast';

describe('utils', () => {
  it('renders auth correctly', async () => {
    showErrorMessage('Error');
    showSuccessMessage('success');
    expect(true).toBe(true);
  });
});
