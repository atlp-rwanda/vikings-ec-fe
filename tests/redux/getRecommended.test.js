/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { describe, it, expect } from '@jest/globals';
import { jestStore } from '../jest.setup';
import recommendedProductsSlice, {
  getRecommendedProducts,
} from '../../src/features/product/recommededProducts';

describe('Get recommended products slice', () => {
  const initialState = {
    recommendedProducts: [],
    isLoading: false,
  };

  it('return recommendedProductsSlice', async () => {
    const expectedActions = [
      { type: 'products/recommended/pending' },
      {
        type: 'products/recommended/rejected',
        payload: { error: 'mocked data' },
      },
      {
        type: 'products/recommended/fulfilled',
        payload: { data: 'mocked data' },
      },
    ];
    await jestStore.dispatch(getRecommendedProducts());
    expect(
      jestStore
        .getActions()
        .map((each) => each.type)
        .includes(expectedActions[2].type)
    ).toBe(true);
  }, 10000);

  it('should set loading true while action is pending', () => {
    const action = { type: getRecommendedProducts.pending };
    const State = recommendedProductsSlice(initialState, action);
    expect(State.isLoading).toEqual(true);
  });

  it('should set data when action is fulfilled', () => {
    const action = { type: getRecommendedProducts.fulfilled };
    const State = recommendedProductsSlice(initialState, action);
    expect(State.isLoading).toEqual(false);
  });

  it('should set error true when action is rejected', () => {
    const action = { type: getRecommendedProducts.rejected };
    const State = recommendedProductsSlice(initialState, action);
    expect(State).toEqual({
      errorMessage: action.payload,
      isLoading: false,
      recommendedProducts: [],
    });
  });
});
