/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { describe, it, expect } from '@jest/globals';
import { jestStore } from '../jest.setup';
import getRatingsSlice, {
  getProductRatings,
} from '../../src/features/product/getRatingsSlice';

describe('Get ratings slice', () => {
  const initialState = {
    ratings: null,
    isLoading: false,
  };

  it('return getRatingsSlice', async () => {
    const expectedActions = [
      { type: 'getRatings/fetchRatings/pending' },
      {
        type: 'getRatings/fetchRatings/fulfilled',
        payload: { data: 'mocked data' },
      },
    ];
    await jestStore.dispatch(
      getProductRatings({ id: 'f471c2c5-e682-4b25-8239-5d0d5c52661b' })
    );
    expect(
      jestStore
        .getActions()
        .map((each) => each.type)
        .includes(expectedActions[1].type)
    ).toBe(true);
  }, 10000);

  it('should set loading true while action is pending', () => {
    const action = { type: getProductRatings.pending };
    const State = getRatingsSlice(initialState, action);
    expect(State.isLoading).toEqual(true);
  });

  it('should set data when action is fulfilled', () => {
    const action = { type: getProductRatings.fulfilled };
    const State = getRatingsSlice(initialState, action);
    expect(State).toEqual({
      ratings: action.payload,
      isLoading: false,
    });
  });

  it('should set error true when action is rejected', () => {
    const action = { type: getProductRatings.rejected };
    const State = getRatingsSlice(initialState, action);
    expect(State).toEqual({
      errorMessage: action.payload,
      isLoading: false,
      ratings: null,
    });
  });
});
