import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { expect, describe, it } from '@jest/globals';
import { Provider } from 'react-redux';
import InputField from '../../src/components/forms/InputField';
import Icon from '../../src/components/forms/googleIcon';
import Account from '../../src/components/profile/Account';

describe('InputField', () => {
  it(' Should render input with label ', () => {
    render(<InputField label="username" />);
    const inputElement = screen.getByText(/username/i);
    expect(inputElement).toBeInTheDocument();
  });
  it(' Should render password input with placeholder', () => {
    render(<InputField type="password" placeholder="Enter password" />);
    const passwordElement = screen.getByPlaceholderText('Enter password');
    expect(passwordElement).toBeInTheDocument();

    expect(passwordElement).toBeInTheDocument();
    expect(passwordElement.type).toBe('password');
  });

  it(' Should render input by role ', () => {
    const { container } = render(<Icon />);
    const searchIcon = container.firstChild;
    expect(searchIcon).toBeInTheDocument();
  });
});
