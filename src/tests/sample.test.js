import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { expect, describe, it } from '@jest/globals';
import LoginPage from '../pages/auth/LoginPage';

describe('LoginPage', () => {
  it(' Should render LoginPage ', () => {
    render(
      <MemoryRouter basename="/">
        <LoginPage />
      </MemoryRouter>,
    );
    const landElement = screen.getByText('Login');
    expect(landElement).toBeInTheDocument();
  });
});
