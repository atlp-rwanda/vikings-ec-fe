import { expect, describe, it } from '@jest/globals';
import { jestStore } from '../jest.setup';
import getRatingsSlice, { getProductRatings } from '../../src/features/product/getRatingsSlice';

describe('Get product ratings', () => {
  const initialState = {
    ratings: null,
    isLoading: false,
  };
  it('should return getRatingsSlice', async () => {
    const expectedActions = [
      { type: 'getRatings/fetchRatings/pedding' },
      { type: 'getRatings/fetchRatings/fulfilled', payload: { data: 'mocked data' } },
    ];
    await jestStore.dispatch(getProductRatings('7ca2e728-a0e0-40b1-9f74-0e39b99e01cc'));
    expect(jestStore.getActions().map((each) => each.type)
      .includes(expectedActions[1].type)).toBe(true);
  });

  it('should set loading to true while action is pending', () => {
    const action = { type: getProductRatings.pending };
    const state = getRatingsSlice(initialState, action);
    expect(state).toEqual({
      isLoading: true, ratings: null,
    });
  });

  it('should return ratings when action is fulfilled', () => {
    const action = {
      type: getProductRatings.fulfilled,
      payload: { id: 1, rate: 3 },
    };
    const State = getRatingsSlice(initialState, action);
    expect(State).toEqual({
      ratings: {
        id: 1,
        rate: 3,
      },
      isLoading: false,
    });
  });

  it('should handle getProductRatings.rejected', () => {
    const error = 'Failed to get ratings';
    const action = getProductRatings.rejected(error);
    const state = getRatingsSlice(initialState, action);
    expect(state.isLoading).toBe(false);
  });
});
