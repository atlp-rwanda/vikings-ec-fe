import React from 'react';
import { screen } from '@testing-library/react';
import {
  expect, describe, test,
} from '@jest/globals';
import CreateCategoryForm from '../../src/components/forms/CreateCategoryForm';
import { renderComponent } from '../jest.setup';

describe('CreateCategoryForm', () => {
  test('renders correctly', () => {
    renderComponent(<CreateCategoryForm />);
    expect(screen.getByTestId('create-category')).toBeDefined();
  });
});
