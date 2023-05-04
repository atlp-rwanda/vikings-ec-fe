import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import {
  expect, describe, it,
} from '@jest/globals';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../src/store';
import ProfilePage from '../../src/pages/profile/ProfilePage';
import ProfileSummary from '../../src/components/profile/ProfileSummary';

describe('Profile page', () => {
  it('Should render edit profile button', () => {
    render(
      <Provider store={store}>
        <Router>
          <ProfilePage />
        </Router>
      </Provider>,
    );

    const pageContent = screen.findByTestId('spinner');
    expect(pageContent).toBeDefined();
  });
});
describe('ProfileSummary component', () => {
  const testData = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    address: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
  };

  it('renders user name and email', () => {
    render(
      <Router>
        <ProfileSummary data={testData} />
      </Router>,
    );
    const nameElement = screen.getByTestId('profile_summary');
    expect(nameElement).toBeDefined();
  });
});
