import React from 'react';
import { render, screen, fireEvent, waitFor, getAllByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Users from '../../src/components/users/UsersTable';
import { Provider } from 'react-redux';
import store from '../../src/store';
import { updateRole } from '../../src/features/auth/rolesSlice';

describe('Users', () => {
  const mockData = {
    data: {
      items: [
        {
          id: 1,
          firstname: 'John',
          lastname: 'Doe',
          email: 'johndoe@gmail.com',
          role: 'user',
          isActive: true,
        },
        {
          id: 2,
          firstname: 'Admin',
          lastname: 'stet',
          email: 'adminstet@example.com',
          role: 'admin',
          isActive: true,
        },
      ],
    },
  };
  jest.mock('../../src/features/auth/rolesSlice', () => ({
     updateRole: jest.fn()
  }));
  it('should render Users headers correctly', () => {
    render(
    <Provider store={store}>
      <Users data={mockData} />
    </Provider>
    );
    expect(screen.getByText('Names')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('status')).toBeInTheDocument();
  });
});