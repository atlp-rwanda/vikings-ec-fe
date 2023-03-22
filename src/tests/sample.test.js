import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import '@testing-library/jest-dom/extend-expect';

describe('LoginPage', () => {
  it('should render LandPage', () => {
    render(
      <MemoryRouter basename="/">
        <LoginPage />
      </MemoryRouter>,
    );
    const landElement = screen.getByText('Login');
    expect(landElement).toBeInTheDocument();
  });
});

