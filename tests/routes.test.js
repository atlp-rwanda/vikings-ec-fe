import * as React from 'react';
import { expect, describe, it } from '@jest/globals';
import { screen, waitFor } from '@testing-library/react';
import renderRoute, { simpleRender } from './jest.setup';
import Button from '../src/components/forms/Button';

describe('My app', () => {
  it('renders home correctly', async () => {
    const renderer = renderRoute('/');
    await waitFor(() => {
      expect(renderer.toJSON()).toMatchSnapshot();
    });
  });
  it('renders auth correctly', async () => {
    const renderer = renderRoute('/auth');
    await waitFor(() => {
      expect(renderer.toJSON()).toMatchSnapshot();
    });
  });
  it('renders redirect-google correctly', async () => {
    const renderer = renderRoute('/redirect-google');
    await waitFor(() => {
      expect(renderer.toJSON()).toMatchSnapshot();
    });
  });
  it('renders auth correctly', async () => {
    const renderer = renderRoute('/auth/signup');
    waitFor(() => {
      expect(renderer.toJSON()).toMatchSnapshot();
    });
  });

  it('renders auth correctly', async () => {
    const renderer = renderRoute('/auth/signin');
    waitFor(() => {
      expect(renderer.toJSON()).toMatchSnapshot();
    });
  });

  it('renders auth correctly', async () => {
    const renderer = renderRoute('/');
    expect(renderer.toJSON()).toMatchSnapshot();
  });
  it('renders button ', async () => {
    const renderer = simpleRender(<Button onClick={() => {}}>text</Button>);

    await waitFor(() => {
      expect(renderer.toJSON()).not.toBe(null);
    });
  });

  it('renders verify auth correctly', async () => {
    const renderer = renderRoute('/verify');
    await waitFor(() => {
      expect(renderer.toJSON()).toMatchSnapshot();
    });
  });

  it('renders resetPassword correctly', async () => {
    const renderer = renderRoute('/auth/reset-password?token="some');
    await waitFor(() => {
      expect(renderer.toJSON()).toMatchSnapshot();
    });
  });

  it('renders resetPassword correctly', async () => {
    const renderer = renderRoute('/auth/reset-password?token="some');
    await waitFor(() => {
      expect(renderer.toJSON()).toMatchSnapshot();
    });
  });
  it('renders landing', async () => {
    const renderer = renderRoute('/auth/reset-password');
    await waitFor(() => {
      expect(renderer.toJSON()).toMatchSnapshot();
    });
  });
  it('renders forgot-password correctly', async () => {
    const renderer = renderRoute('/auth/forgot-password');
    await waitFor(() => {
      expect(renderer.toJSON()).toMatchSnapshot();
    });
  });
  it('renders profile page', async () => {
    const renderer = renderRoute('/profile');
    screen.findByTestId('address_header');
    expect(renderer.toJSON()).toMatchSnapshot();
  });
  it('renders edit profile page correct', async () => {
    const renderer = renderRoute('/profile/update');
    screen.findByTestId('tabs');
    expect(renderer.toJSON()).toMatchSnapshot();
    expect(renderer.toJSON()).toMatchSnapshot();
  });
  it('renders verify email correctly', async () => {
    const renderer = renderRoute('/auth/verify-email/token');
  });
  it('renders create product correctly', async () => {
    const renderer = renderRoute('/dashboard/products/create');
    await waitFor(() => {
      expect(renderer.toJSON()).toMatchSnapshot();
    });
  });
  it('renders update product correctly', async () => {
    const renderer = renderRoute('/products/dashboard/b5e75a01-5e67-44ad-91bd-f36ab3564a48');
    await waitFor(() => {
      expect(renderer.toJSON()).toMatchSnapshot();
    });
  });
});
