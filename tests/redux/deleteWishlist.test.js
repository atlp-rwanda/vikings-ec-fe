/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { describe, it, expect } from '@jest/globals';
import { jestStore } from '../jest.setup';
import deleteWishlistSlice, {
  deleteWishlist,
} from '../../src/features/wishlist/deleteWishlistSlice';

describe('Delete wishlist slice', () => {
  const initialState = {
    isLoading: false,
    data: null,
  };

  it('return deleteWishlist', async () => {
    const expectedActions = [
      { type: 'deleteWishlist/pending' },
      { type: 'deleteWishlist/fulfilled' },
    ];
    await jestStore.dispatch(deleteWishlist({
      id: 'bc645027-5544-4f6a-af8c-c6aa2b1a02b5',
    }));
    expect(
      jestStore
        .getActions()
        .map((each) => each.type)
        .includes(expectedActions[1].type),
    ).toBe(false);
  }, 10000);

  it('should set loading true while action is pending', () => {
    const action = { type: deleteWishlist.pending };
    const State = deleteWishlistSlice(initialState, action);
    expect(State.isLoading).toEqual(true);
  });

  it('should set data when action is fulfilled', () => {
    const action = { type: deleteWishlist.fulfilled };
    const State = deleteWishlistSlice(initialState, action);
    expect(State.isLoading).toEqual(false);
  });

  it('should set error true when action is rejected', () => {
    const action = { type: deleteWishlist.rejected };
    const State = deleteWishlistSlice(initialState, action);
    expect(State).toEqual({
      error: action.payload,
      isLoading: false,
      data: null,
    });
  });
});
