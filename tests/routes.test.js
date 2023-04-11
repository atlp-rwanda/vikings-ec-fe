import * as React from 'react';
import { expect, describe, it } from '@jest/globals';
import { waitFor } from '@testing-library/react';
import renderRoute, { render } from './jest.setup';
import Button from '../src/components/forms/Button';

describe('My app', () => {
  it('renders auth correctly', async () => {
    const renderer = renderRoute('/auth');
    await waitFor(() => {
      expect(renderer.toJSON())
        .toMatchSnapshot();
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
    const renderer = render(<Button onClick={() => {}}>text</Button>);

    await waitFor(() => {
      expect(renderer.toJSON()).not.toBe(null);
    });
  });
});
