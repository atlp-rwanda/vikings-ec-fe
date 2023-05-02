import { describe, it, expect } from '@jest/globals';
import { jestStore } from '../jest.setup';

import removeFromCartSlice, { removeFromCart } from '../../src/features/cart/removeProductFromCartSlice';

describe('removeFromCart Cart slice', () => {
  const initialState = {
    isLoading: false,
    error: null,
  };

  it('return removeFromCart', async () => {
    const expectedActions = [
      { type: 'removeFromCart/pending' },
      { type: 'removeFromCart/fulfilled' },
    ];
    await jestStore.dispatch(removeFromCart({
      id: 'bc645027-5544-4f6a-af8c-c6aa2b1a02b5',
    }));
    expect(
      jestStore
        .getActions()
        .map((each) => each.type)
        .includes(expectedActions[1].type),
    ).toBe(true);
  }, 10000);
  it('should set loading true while action is pending', () => {
    const action = { type: removeFromCart.pending };
    const State = removeFromCartSlice(initialState, action);
    expect(State).toEqual({ isLoading: true, error: null, data: null });
  });

  it('should set user when action is fulfilled', () => {
    const action = {
      type: removeFromCart.fulfilled,
      payload: {},
    };
    const State = removeFromCartSlice(initialState, action);
    expect(State).toEqual({
      error: null,
      isLoading: false,
      data: {},
    });
  });

  it('should set error true when action is rejected', () => {
    const action = { type: removeFromCart.rejected };
    const State = removeFromCartSlice(initialState, action);
    expect(State).toEqual({
      data: null,
      error: action.payload,
      isLoading: false,
    });
  });
});
