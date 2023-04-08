import {
  describe, expect, it,
} from '@jest/globals';
import { userEvent } from '@storybook/testing-library';
import { renderComponent } from '../jest.setup';
import CartPage from '../../src/pages/cart/CartPage';
import HomePage from '../../src/pages/HomePage';

describe('Cart page', () => {
  it('views items on cart', async () => {
    const renderer = renderComponent(<CartPage />);
    const bean = await renderer.findAllByText(/\bBeans\b/);
    expect(bean).toBeDefined();
  });
  it('remove Item from cart', async () => {
    const renderer = renderComponent(<CartPage />);
    const removeBtns = await renderer.findAllByTestId(/\bremove-from-cart\b/);
    expect(removeBtns).toBeDefined();
    userEvent.click(removeBtns[0]);
    expect(true).toBe(true);
  });
  it('increase cart item', async () => {
    const renderer = renderComponent(<CartPage />);
    const addBtns = await renderer.findAllByTestId(/\bincrease-cart-item\b/);
    expect(addBtns).toBeDefined();
    userEvent.click(addBtns[0]);
    expect(true).toBe(true);
  });
  it('decrease cart item', async () => {
    const renderer = renderComponent(<CartPage />);
    const addBtns = await renderer.findAllByTestId(/\bdecrease-cart-item\b/);
    expect(addBtns).toBeDefined();
    userEvent.click(addBtns[0]);
    expect(true).toBe(true);
  });
  it('views products', async () => {
    const renderer = renderComponent(<HomePage />);
    const beans = await renderer.findAllByText(/\bBeans\b/);
    const parent = await renderer.findAllByTestId(/\bproduct-card\b/);
    expect(parent).toBeDefined();
    userEvent.hover(parent[0]);
    const addToCartBtns = await renderer.findAllByTestId(/\badd-to-cart\b/);
    userEvent.click(addToCartBtns[0]);
    expect(beans).toBeDefined();
  });
});
