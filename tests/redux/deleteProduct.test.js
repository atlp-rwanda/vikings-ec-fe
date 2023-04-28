/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { describe, it, expect } from '@jest/globals';
import { jestStore } from '../jest.setup';
import deleteProductSlice, {
  deleteProduct,
} from '../../src/features/product/deleteProduct';

describe('Delete product slice', () => {
  const initialState = {
    data: null,
    isLoading: false,
  };

  it('return deleteProductSlice', async () => {
    const expectedActions = [
      { type: 'products/deleteProduct/pending' },
      {
        type: 'products/deleteProduct/rejected',
        payload: { error: 'mocked data' },
      },
      {
        type: 'products/deleteProduct/fulfilled',
        payload: { data: 'mocked data' },
      },
    ];
    await jestStore.dispatch(
      deleteProduct({ id: 'f471c2c5-e682-4b25-8239-5d0d5c52661b' })
    );
    expect(
      jestStore
        .getActions()
        .map((each) => each.type)
        .includes(expectedActions[1].type)
    ).toBe(true);
  }, 10000);

  it('should set loading true while action is pending', () => {
    const action = { type: deleteProduct.pending };
    const State = deleteProductSlice(initialState, action);
    expect(State.isLoading).toEqual(true);
  });

  it('should set data when action is fulfilled', () => {
    const action = { type: deleteProduct.fulfilled };
    const State = deleteProductSlice(initialState, action);
    expect(State.isLoading).toEqual(false);
  });

  it('should set error true when action is rejected', () => {
    const action = { type: deleteProduct.rejected };
    const State = deleteProductSlice(initialState, action);
    expect(State).toEqual({
      error: action.payload,
      isLoading: false,
      data: null,
    });
  });
});