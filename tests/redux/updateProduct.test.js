/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { describe, it, expect } from '@jest/globals';
import { jestStore } from '../jest.setup';
import updateProductSlice, {
  updateProduct,
} from '../../src/features/product/updateProduct';

describe('Update product slice', () => {
  const initialState = {
    data: null,
    isLoading: false,
  };

  it('return updateProductSlice', async () => {
    const expectedActions = [
      { type: 'products/updateProduct/pending' },
      {
        type: 'products/updateProduct/fulfilled',
        payload: { data: 'mocked data' },
      },
    ];
    await jestStore.dispatch(updateProduct({ name: 'Laptop' }));
    expect(
      jestStore
        .getActions()
        .map((each) => each.type)
        .includes(expectedActions[1].type)
    ).toBe(false);
  }, 10000);

  it('should set loading true while action is pending', () => {
    const action = { type: updateProduct.pending };
    const State = updateProductSlice(initialState, action);
    expect(State.isLoading).toEqual(true);
  });

  it('should set data when action is fulfilled', () => {
    const action = { type: updateProduct.fulfilled };
    const State = updateProductSlice(initialState, action);
    expect(State).toEqual({
      data: action.payload,
      isLoading: false,
    });
  });

  it('should set error true when action is rejected', () => {
    const action = { type: updateProduct.rejected };
    const State = updateProductSlice(initialState, action);
    expect(State).toEqual({
      error: action.payload,
      isLoading: false,
      data: null,
    });
  });
});
