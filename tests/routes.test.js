import * as React from 'react';
import { expect, describe, it } from '@jest/globals';
import { waitFor } from '@testing-library/react';
import renderRoute, { simpleRender, renderPath } from './jest.setup';
import Button from '../src/components/forms/Button';
import 'setimmediate';

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
  it('renders button ', async () => {
    const renderer = simpleRender(<Button onClick={() => {}}>text</Button>);
    await waitFor(() => {
      expect(renderer.toJSON()).not.toBe(null);
    });
  });
  it('renders verify auth correctly', async () => {
    const renderer = renderRoute('auth/verify');
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
  it('renders edit profile page correct', async () => {
    const renderer = renderRoute('/profile/update');
    await waitFor(() => { expect(renderer.toJSON()).toMatchSnapshot(); });
  });
  it('renders verify email correctly', async () => {
    const renderer = renderRoute('/auth/verify-email/token');
    await waitFor(() => {
      expect(renderer.toJSON()).toMatchSnapshot();
    });
  });
  it('renders create product correctly', async () => {
    const renderer = renderRoute('/dashboard/products/create');
    await waitFor(() => {
      expect(renderer.toJSON()).toMatchSnapshot();
    });
  });
  it('renders dashboard', async () => {
    const renderer = renderRoute('/dashboard');
    await waitFor(() => {
      expect(renderer.toJSON()).toMatchSnapshot();
    });
  });
  it('renders dashboard', async () => {
    const renderer = renderRoute('/dashboard/orders');
    await waitFor(() => {
      expect(renderer.toJSON()).toMatchSnapshot();
    });
  });
  it('renders dashboard', async () => {
    const renderer = renderRoute('/dashboard/sales');
    await waitFor(() => {
      expect(renderer.toJSON()).toMatchSnapshot();
    });
  });
  it('renders update product correctly', async () => {
    const renderer = renderRoute('/dashboard/products/b5e75a01-5e67-44ad-91bd-f36ab3564a48');
    await waitFor(() => {
      expect(renderer.toJSON()).toMatchSnapshot();
    });
  });
  it('rends dashboard Correctly', async () => {
    const renderer = renderRoute('/seller-products');
    await waitFor(() => {
      expect(renderer.toJSON()).toMatchSnapshot();
    });
  });
  it('renders Users data correctly', async () => {
    const renderer = renderRoute('/dashboard/users');
    await waitFor(() => {
      expect(renderer.toJSON()).toMatchSnapshot();
    });
  });
  it('renders Users data correctly', async () => {
    const renderer = renderRoute('/notifications');
    await waitFor(() => {
      expect(renderer.toJSON()).toMatchSnapshot();
    });
  });
});

