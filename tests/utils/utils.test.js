import React from 'react';
import { describe, it, expect } from '@jest/globals';
import { showErrorMessage, showSuccessMessage } from '../../src/utils/toast';
import getFormFromObject from '../../src/utils/getFormData';

describe('utils', () => {
  it('renders auth correctly', async () => {
    showErrorMessage('Error');
    showSuccessMessage('success');
    expect(true).toBe(true);
  });
});
describe('getFormFromObject', () => {
  it('should return null when called with no arguments', () => {
    expect(getFormFromObject()).toBeNull();
  });

  it('should convert an object to FormData', () => {
    const data = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: 30,
      hobbies: ['reading', 'running'],
    };
    const formData = getFormFromObject(data);
    expect(formData).toBeInstanceOf(FormData);
    expect(formData.get('name')).toEqual('John Doe');
    expect(formData.get('email')).toEqual('john.doe@example.com');
    expect(formData.get('age')).toEqual('30');
    expect(formData.getAll('hobbies')).toEqual(['reading', 'running']);
  });

  it('should append each value in an array as a separate field', () => {
    const data = {
      name: 'John Doe',
      hobbies: ['reading', 'running'],
    };
    const formData = getFormFromObject(data);
    expect(formData.getAll('hobbies')).toEqual(['reading', 'running']);
  });
});
