/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { describe, it, expect } from '@jest/globals';
import { jestStore } from '../jest.setup';
import wishlistslice, {addToWishlist} from '../../src/features/wishlist/wishlistslice';

describe(' slice', () => {
  const initialState = {
    data: null,
    isLoading: false,
    error: null,
  };

  it('addToWishlistSlice', async () => {
    const expectedActions = [
      { type: 'addToWishlist/pending' },
      { type: 'addToWishlist/fulfilled', payload: { data: 'mocked data' } },
    ];
    expect(
      jestStore
        .getActions()
        .map((each) => each.type)
        .includes(expectedActions[1].type),
    ).toBe(false);
  }, 10000);

  it('should set loading true while action is pending', () => {
    const action = { type: addToWishlist.pending };
    const State = wishlistslice(initialState, action);
    expect(State).toEqual({ isLoading: true, data: null, error: null });
  });
  it('should set user when action is fulfilled', () => {
    const action = {
      type: addToWishlist.fulfilled,
      payload: { id: 1, name: 'John', age: 20 },
    };
    const State = wishlistslice(initialState, action);
    expect(State).toEqual({
      error: null,
      isLoading: false,
      data: action.payload,
    });
  });
  it('should set error true when action is rejected', () => {
    const action = { type: addToWishlist.rejected };
    const State = wishlistslice(initialState, action);
    expect(State).toEqual({
      error: action.payload,
      isLoading: false,
      data: null,
    });
  });
});
