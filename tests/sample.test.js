import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { expect, describe, it } from '@jest/globals';
import InputField from '../src/components/forms/InputField';

describe('LoginPage', () => {
  it(' Should render LoginPage ', () => {
    render(
      <MemoryRouter basename="/">
        <InputField label="email" />
      </MemoryRouter>,
    );
    const landElement = screen.getByText('email');
    expect(landElement).toBeInTheDocument();
  });
});
